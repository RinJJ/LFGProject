from models import *
from app import app
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


if __name__ == '__main__':
    with app.app_context():

        engine = create_engine('sqlite:///instance/app.db')
        Session = sessionmaker(bind=engine)
        session = Session()

        session.query(User).delete()
        session.query(Character).delete()
        session.query(CharacterGroup).delete()
        session.query(Group).delete()



        u1 = User(
            username = 'Rin',
            email = 'jesse@email.com',
            password_hash = '123',
        )

        u2 = User(
            username = 'Zig',
            email = 'zag@email.com',
            password_hash = '123',
        )



        c1 = Character(
            character_name = 'Brumbpo Tungus',
            character_race = 'Dwarf (Hill)',
            character_class = 'Cleric',
            user_id = 1
        )

        c2 = Character(
            character_name = 'Carl Carlsworth',
            character_race = 'Dragonborn',
            character_class = 'Rogue',
            user_id = 1
        )

        c3 = Character(
            character_name = 'Charles Button',
            character_race = 'Halfling',
            character_class = 'Paladin',
            user_id = 2
        )

        c4 = Character(
            character_name = 'Falafel Falafel',
            character_race = 'Elf (High)',
            character_class = 'Wizard',
            user_id = 2
        )



        g1 = Group(
        group_name = 'Just a few Friends playing DnD',
        user_id = 1,
        )



        cg1 = CharacterGroup(
            character_id = 1,
            group_id = 1,
        )

        cg2 = CharacterGroup(
            character_id = 2,
            group_id = 1,
        )

        cg3 = CharacterGroup(
            character_id = 3,
            group_id = 1,
        )

        cg4 = CharacterGroup(
            character_id = 4,
            group_id = 1,
        )

    session.bulk_save_objects([u1, u2, c1, c2, c3, c4, g1, cg1, cg2, cg3, cg4])
    session.commit()
    session.close()
    
