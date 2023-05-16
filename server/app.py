from flask import Flask, request, make_response, session
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api, Resource

from config import app, db, api, bcrypt
from models import User, Group, Character, CharacterGroup


#TODO: remember that we need seperate gets that get get a list of Groups by User/Username and by Character
#TODO: how to differentiate the User ID in Groups from the User id's related to the characters. Does it even matter due to scope?
#TODO:



app.secret_key = b'\x0e8.\xe0[\xdf\x01\x06\xc3\x8e\xf3\xeb\xdb\x0c\x7f\x88'


class Home(Resource):
    def get(self):
        return make_response("server is connected", 200)

api.add_resource(Home, '/')







class Users(Resource):
    def get(self):
        users = User.query.all()
        if not users:
            return make_response( { 'error' : '404: Users Not Found' } )
        
        users_dict = [user.to_dict() for user in users]
        return make_response( users_dict, 200 )

api.add_resource(Users, '/users')






class UserById(Resource):
    def get(self, id):
        user_by_id = User.query.filter(User.id == id).first()
        if not user_by_id:
            return make_response( { 'error' : '404 User not found' } )
        
        user_by_id_dict = user_by_id.to_dict()
        return make_response( user_by_id_dict, 200 )

api.add_resource(UserById, '/users/<int:id>')






class Characters(Resource):
    def get(self):
        characters = Character.query.all()
        if not characters:
            return make_response( { 'error' : '404: Characters Not Found' }, 404 )
        
        characters_dict = [character.to_dict() for character in characters]
        return make_response( characters_dict, 200 )

    def post(self):
        try:
            data = request.get_json()

            required_fields = ['character_name', 'character_race', 'character_class', 'user_id']
            if not all(field in data for field in required_fields):
                return make_response({'Error': 'Missing required fields'}, 400)
            
            new_character = Character(
                character_name = data['character_name'],
                character_race = data['character_race'],
                character_class = data['character_class'],
                user_id = data['user_id'],
            )

            db.session.add( new_character )
            db.session.commit()
            new_character_dict = new_character.to_dict()
            return make_response(new_character_dict, 200)
        
        except KeyError as e:
            return make_response({'error' : f'Missing Field: {str(e)}'}, 400)

        except ValueError as e:
            return make_response({'error' : f'Invalid Value: {str(e)}'}, 400)
        
        except Exception as e:
            db.session.rollback()
            return make_response( { 'error' : str(e) }, 422 )

api.add_resource(Characters, '/characters')







class CharacterById(Resource):
    def get(self, id):
        character_by_id = Character.query.filter(Character.id == id).first()

        if not character_by_id:
            return make_response( { 'error' : '404 Character not found' } )
        
        character_by_id_dict = character_by_id.to_dict()
        return make_response( character_by_id_dict, 200 )

    def patch(self, id):
        character_by_id = Character.query.filter(Character.id == id).first()
        if not character_by_id:
            return make_response( { 'error' : '404 Character not found' } ) 
        
        try:
            for attr in request.get_json():
                setattr( character_by_id, attr, request.get_json()[attr] )

            db.session.add( character_by_id )
            db.session.commit()
            character_by_id_dict = character_by_id.to_dict()
            return make_response(character_by_id_dict, 201 )
        
        except KeyError as e:
            db.session.rollback()
            return make_response({'error': f'Missing attribute: {str(e)}'}, 422)

        except AttributeError as e:
            db.session.rollback()
            return make_response({'error': f'Invalid attribute: {str(e)}'}, 422)

        except ValueError as e:
            db.session.rollback()
            return make_response({'error': f'Invalid value: {str(e)}'}, 422)

        except Exception as e:
            db.session.rollback()
            return make_response({'error': str(e)}, 500)
        
    def delete(self, id):
        character_by_id = Character.query.filter(Character.id == id).first()
        if character_by_id == None:
            return make_response( { 'error' : '404 Character not found' }, 404 ) 
        try:
            db.session.delete(character_by_id)
            db.session.commit()
            return make_response( '' ,200 )
        except Exception as e:
            db.session.rollback()
            return make_response( { "error" : str(e) }, 422 )

api.add_resource(CharacterById, '/characters/<int:id>')







class Groups(Resource):
    def get(self):
        groups = Group.query.all()
        if not groups:
            return make_response( { 'error' : '404: Groups Not Found' } )
        groups_dict = [group.to_dict() for group in groups]
        return make_response( groups_dict, 200 )

    def post(self):
        try:
            data = request.get_json()

            new_group = Group(
                group_name = data['group_name'],
                user_id = data['user_id'], ### we wnat to snag the username from this?
            )
            db.session.add( new_group )
            db.session.commit()
            new_group_dict = new_group.to_dict()
            return make_response(new_group_dict, 200)
        
        except KeyError as e:
            return make_response({'Error' : f'Missing Field: {str(e)}'}, 400)

        except ValueError as e:
            return make_response({'Error' : f'Invalid Value: {str(e)}'}, 400)
        
        except Exception as e:
            db.session.rollback()
            return make_response( { 'Error' : str(e) }, 422 )

api.add_resource(Groups, '/groups/')







class GroupById(Resource):
    def get(self, id):
        group_by_id = Group.query.filter(Group.id == id).first()
        if not group_by_id:
            return make_response( { 'error' : '404 Group not found' } )
        
        group_by_id_dict = group_by_id.to_dict()
        return make_response( group_by_id_dict, 200 )

    def patch(self, id):
        group_by_id = Group.query.filter(Group.id == id).first()
        if not group_by_id:
            return make_response( { 'error' : '404 Group not found' } ) 
            
        try:
            for attr in request.get_json():
                setattr( group_by_id, attr, request.get_json()[attr] )

            db.session.add( group_by_id )
            db.session.commit()
            group_by_id_dict = group_by_id.to_dict()
            return make_response(group_by_id_dict, 201 )
        
        except KeyError as e:
            db.session.rollback()
            return make_response({'error': f'Missing attribute: {str(e)}'}, 422)

        except AttributeError as e:
            db.session.rollback()
            return make_response({'error': f'Invalid attribute: {str(e)}'}, 422)

        except ValueError as e:
            db.session.rollback()
            return make_response({'error': f'Invalid value: {str(e)}'}, 422)

        except Exception as e:
            db.session.rollback()
            return make_response({'error': str(e)}, 500)
        
    def delete(self,id):
        group_by_id = Group.query.filter(Group.id == id).first()
        if not group_by_id:
            return make_response( { 'error' : '404 Group not found' } )
        
        try:
            db.session.delete(group_by_id)
            db.session.commit()
            return make_response( '' ,200 )
        
        except Exception as e:
            db.session.rollback()
            return make_response( { "error" : str(e) }, 422 )

api.add_resource(GroupById, '/groups/<int:id>')







class CharacterGroups(Resource):
    def get(self):
        character_groups = CharacterGroup.query.all()
        if not character_groups:
            return make_response( { 'error' : '404: CharacterGroups Not Found' } )
        
        character_groups_dict = [character_group.to_dict() for character_group in character_groups]
        return make_response( character_groups_dict, 200 )

    def post(self):
        try:
            data = request.get_json()
            new_character_group = CharacterGroup(
                character_id = data['character_id'],
                group_id = data['group_id'],
            )
            db.session.add( new_character_group )
            db.session.commit()
            
            groups = Group.query.all()
            if not groups:
                return make_response( { 'error' : '404: Groups Not Found' } )
            groups_dict = [group.to_dict() for group in groups]
            return make_response( groups_dict, 200 )

        except KeyError as e:
            return make_response({'Error' : f'Missing Field: {str(e)}'}, 400)

        except ValueError as e:
            return make_response({'Error' : f'Invalid Value: {str(e)}'}, 400)
        
        except Exception as e:
            db.session.rollback()
            return make_response( { 'Error' : str(e) }, 422 )
### this is bad because it is a yikes workaround for not being able to update state of a Nested Array in a state.

api.add_resource(CharacterGroups, '/charactergroups/')







class CharacterGroupById(Resource):
    def get(self, id):
        character_group_by_id = CharacterGroup.query.filter(CharacterGroup.id == id).first()
        if not character_group_by_id:
            return make_response( { 'error' : '404 CharacterGroupee not found' } )
        character_group_by_id_dict = character_group_by_id.to_dict()
        return make_response( character_group_by_id_dict, 200 )

    def patch(self, id):
        group_by_id = CharacterGroup.query.filter(CharacterGroup.id == id).first()
        if not group_by_id:
            return make_response( { 'error' : '404 Group not found' } ) 
        
        try:
            for attr in request.get_json():
                setattr( group_by_id, attr, request.get_json()[attr] )

            db.session.add( group_by_id )
            db.session.commit()
            group_by_id_dict = group_by_id.to_dict()
            return make_response(group_by_id_dict, 201 )
        
        except KeyError as e:
            db.session.rollback()
            return make_response({'error': f'Missing attribute: {str(e)}'}, 422)

        except AttributeError as e:
            db.session.rollback()
            return make_response({'error': f'Invalid attribute: {str(e)}'}, 422)

        except ValueError as e:
            db.session.rollback()
            return make_response({'error': f'Invalid value: {str(e)}'}, 422)

        except Exception as e:
            db.session.rollback()
            return make_response({'error': str(e)}, 500)
        
    def delete(self,id):
        group_by_id = Group.query.filter(Group.id == id).first()
        if not group_by_id:
            return make_response( { 'error' : '404 Group not found' } ) 
        try:
            db.session.delete(group_by_id)
            db.session.commit()
            return make_response( {} )
        
        except Exception as e:
            db.session.rollback()
            return make_response( { "error" : str(e) }, 422 )

api.add_resource(CharacterGroupById, '/charactergroups/<int:id>')





class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = User(
                username = data['username'],
                email = data['email']
            )
            new_user.password_hash = data['password']

            db.session.add( new_user )
            db.session.commit()

            session['user_id'] = new_user.id  ### if it doesnt work check ix auth video #1 @17:00 id is what i called id in models

            new_user_dict = new_user.to_dict()
            return make_response(new_user_dict, 201)

        except KeyError as e:
            db.session.rollback()
            return make_response({'error': f'Missing key in request data: {str(e)}'}, 422)

        except Exception as e:
            db.session.rollback()
            return make_response({'error': str(e)}, 500)

api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        try:

            user = User.query.filter_by(email=request.get_json()['email']).first() ## changed to email because it is the input in the form? Makes sense to me
            
            if not user:
                return make_response( {'Error': 'could not find user'}, 404)
            
            if user.authenticate(request.get_json()['password']):
                session['user_id'] = user.id ###named this way due to how the tables are setup?
                return make_response(user.to_dict(), 200)
            
            else:
                return make_response( {'Error': 'Incorrect Password'}, 401 )
            
        except Exception as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        if session.get('user_id') is None:
            return make_response({'error': 'User is already logged out'}, 404)
        
        session['user_id'] = None

        return make_response('', 204)

api.add_resource(Logout, '/logout')

class AuthorizedSession(Resource):
    def get(self):
        user = User.query.filter_by(id = session.get('user_id')).first()

        if user:
            response = make_response( user.to_dict(), 200 )
            return response
        
        else:
            return make_response( { 'Unauthorized': 'User Not Found' } , 404 )

api.add_resource(AuthorizedSession, '/authorized')



## Characters by user
class CharactersByUserId(Resource):
    def get(self, id):
        characters = Character.query.all()
        if not characters:
            return make_response({ 'error': 'No characters found' }, 404 )
        
        try:
            
            characters_by_user_id_dict = [c.to_dict() for c in characters if c.user_id == id]
            return make_response( characters_by_user_id_dict, 200 )
        
        except Exception as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(CharactersByUserId, '/charactersbyuser/<int:id>')

## Groups Owned by User
class GroupsOwnedByUserId(Resource):
    def get(self, id):
        groups = Group.query.filter_by(user_id=id).all()
        if not groups:
            return make_response({ 'error': 'No groups were found' }, 404 )
        
        try:
            groups_owned_by_user_id_dict = [g.to_dict() for g in groups]
            return make_response(groups_owned_by_user_id_dict, 200)

        except Exception as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(GroupsOwnedByUserId, '/groupsownedbyuser/<int:id>')

# Groups that the User has a CharacterGroup in
class GroupsUserIdIsIn(Resource):

    def get(self, id):
        groups = db.session.query(Group).join(CharacterGroup).join(CharacterGroup.character).filter(Character.user_id == id).all()

        if not groups:
            return make_response({'error': 'No groups found for the given user ID'}, 404)
        try:

            groups_dict = [group.to_dict() for group in groups]
            return make_response(groups_dict, 200)
        except Exception as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(GroupsUserIdIsIn, '/groupsuserisin/<int:id>')


class DeleteCharacterGroupUserIdIsIn(Resource):

    def delete(self, group_id, user_id):
        character_group = CharacterGroup.query.filter_by(group_id=group_id, character_id=user_id).first()

        if not character_group:
            return make_response({'error': 'No character group found for the given user_id and group_id'}, 404)
        try:
            db.session.delete(character_group)
            db.session.commit()
            return make_response('', 200)
        except Exception as e:
            db.session.rollback()
            return make_response({'error': str(e)}, 500)

api.add_resource(DeleteCharacterGroupUserIdIsIn, '/deletecharactergroup/<int:group_id>/<int:user_id>')







if __name__ == '__main__':
    app.run(port=5555, debug=True)