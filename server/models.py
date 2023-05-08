from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt





class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ( '-characters.user', '-groups.user', '-characters.groups' ) #TODO: I would like to just go over mindset on what we really want from this when doing a request from front end.
# Is the reason that trying to get the groups to serialize is breaking because it is also trying to serialize user or character again and I need to add the rules here? 
# Do these rules only apply when fetching from this specific model or do the rules count as the other data is serialized through
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False)
    _password_hash = db.Column(db.String)


    characters = db.relationship( 'Character', backref='user' ) 
    groups = db.relationship( 'Group', backref='user' ) 


    
    @validates('email')
    def validate_email(self, key, email):
        if (email == "") or ('@' not in email) or ('.' not in email):
            raise ValueError("Must provide a valid email")
        return email

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    


    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))






class Character(db.Model, SerializerMixin):
    __tablename__ = 'characters'

    serialize_rules = ( '-character_groups.character', '-user._password_hash', '-user.characters', '-user.groups', 'groups' ) #TODO

    id = db.Column(db.Integer, primary_key=True)
    character_name = db.Column(db.String, nullable=False)
    character_race = db.Column(db.String, nullable=False)
    character_class = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    character_groups = db.relationship( 'CharacterGroup', backref='character' )
    groups = association_proxy( 'character_groups', 'group' ) #TODO: I could not get this to work by Character.query.get(2).group or Character.query.get(2).groups

    @validates('character_name')
    def validate_character_name(self, key, character_name):
        if character_name == "":
            raise ValueError("Must provide a name for your character")
        return character_name
    
    @validates('character_race')
    def validate_character_race(self, key, character_race):
        if character_race not in [ 'Dragonborn', 'Dwarf', 'Dwarf (Hill)', 'Dwarf (Mountain)', 'Elf', 'Elf (Drow)', 'Elf (High)', 'Elf (Wood)', 'Gnome', 'Gnome (Forest)', 'Gnome (Rock)', 'Half-Elf', 'Half-Orc', 'Halfling', 'Halfling (Lightfoot)', 'Halfling (Stout)', 'Human', 'Human (Variant)', 'Tiefling' ]:
            raise ValueError("Must provide a valid race for your character")
        return character_race
    
    @validates('character_class')
    def validate_character_class(self, key, character_class):
        if character_class not in [ 'Barbarian','Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard' ]:
            raise ValueError("Must provide a valid class for your character")
        return character_class






class CharacterGroup(db.Model, SerializerMixin):
    __tablename__ = 'character_groups'

    serialize_rules = ( '-character.user._password_hash', '-character.user.characters', '-character.user.groups', '-character.group', '-character.character_groups', '-group', '-character_groups' ) #TODO

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'), nullable=False)






class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'

    serialize_rules = ( '-characters.group', '-character_groups.group', '-character_groups.character.user', '-character_groups.character.groups', '-character_groups.character.character_groups', '-user' ) #TODO

    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(75), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    character_groups = db.relationship( 'CharacterGroup', backref='group', cascade='all, delete-orphan' ) 
    characters = association_proxy( 'character_groups', 'character' ) 


    @validates('group_name')
    def validate_character_name(self, key, group_name):
        if group_name == "":
            raise ValueError("Must provide a name for your character")
        return group_name


