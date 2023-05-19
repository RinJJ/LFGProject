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
            username = 'Test1',
            email = 'Test1@email.com',
            password_hash = '123',
        )

        u3 = User(
            username = 'Test2',
            email = 'Test2@email.com',
            password_hash = '123',
        )

        u4 = User(
            username = 'Test3',
            email = 'Test3@email.com',
            password_hash = '123',
        )

        u5 = User(
            username = 'Test4',
            email = 'Test4@email.com',
            password_hash = '123',
        )

        u6 = User(
            username = 'Test5',
            email = 'Test5@email.com',
            password_hash = '123',
        )

        u7 = User(
            username = 'Test6',
            email = 'Test6@email.com',
            password_hash = '123',
        )

        u8 = User(
            username = 'Test7',
            email = 'Test7@email.com',
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
        
        c5 = Character(
            character_name = 'Perryadrina Ohmsyd',
            character_race = 'Elf (High)',
            character_class = 'Warlock',
            user_id = 3
        )
        c6 = Character(
            character_name = 'Crookedrui',
            character_race = 'Half-Orc',
            character_class = 'Cleric',
            user_id = 3
        )
        c7 = Character(
            character_name = "Dobrper Do'rris",
            character_race = 'Elf (Wood)',
            character_class = 'Ranger',
            user_id = 4
        )
        c8 = Character(
            character_name = 'Zork',
            character_race = 'Dwarf (Mountain)',
            character_class = 'Warlock',
            user_id = 4
        )
        c9 = Character(
            character_name = 'Micheek Cheeks',
            character_race = 'Gnome (Rock)',
            character_class = 'Bard',
            user_id = 5
        )
        c10 = Character(
            character_name = 'Murrala Elfreeman',
            character_race = 'Elf (Wood)',
            character_class = 'Druid',
            user_id = 5
        )
        c11 = Character(
            character_name = "Drizzgraham Do'cker Panga",
            character_race = 'Halfling (Stout)',
            character_class = 'Paladin',
            user_id = 6
        )
        c12 = Character(
            character_name = 'Kingolly Cooperorty Elfmatthews',
            character_race = 'Halfling (Stout)',
            character_class = 'Ranger',
            user_id = 6
        )
        c13 = Character(
            character_name = 'John Smith',
            character_race = 'Human (Variant)',
            character_class = 'Rogue',
            user_id = 7
        )
        c14 = Character(
            character_name = 'Samuel Longshanks',
            character_race = 'Elf (Drow)',
            character_class = 'Rogue',
            user_id = 7
        )
        c15 = Character(
            character_name = 'Gerald Heavyhands',
            character_race = 'Dragonborn',
            character_class = 'Monk',
            user_id = 8
        )
        c16 = Character(
            character_name = 'Frank Franklin',
            character_race = 'Dwarf (Mountain)',
            character_class = 'Cleric',
            user_id = 8
        )



        g1 = Group(
        group_name = 'Just a few Friends playing DnD',
        user_id = 1,
        )

        g2 = Group(
        group_name = 'Not Critical Role',
        user_id = 2,
        )

        g3 = Group(
        group_name = 'Not Dimension 20',
        user_id = 3,
        )

        g4 = Group(
        group_name = 'A Family with Ten Dads',
        user_id = 5,
        )




        cg1 = CharacterGroup(
            character_id = 1,
            group_id = 1,
        )

        cg2 = CharacterGroup(
            character_id = 2,
            group_id = 2,
        )

        cg3 = CharacterGroup(
            character_id = 3,
            group_id = 3,
        )

        cg4 = CharacterGroup(
            character_id = 4,
            group_id = 4,
        )
        cg5 = CharacterGroup(
            character_id = 5,
            group_id = 1,
        )
        cg6 = CharacterGroup(
            character_id = 6,
            group_id = 2,
        )
        cg7 = CharacterGroup(
            character_id = 7,
            group_id = 3,
        )
        cg8 = CharacterGroup(
            character_id = 8,
            group_id = 4,
        )
        cg9 = CharacterGroup(
            character_id = 9,
            group_id = 1,
        )
        cg10 = CharacterGroup(
            character_id = 10,
            group_id = 2,
        )
        cg11 = CharacterGroup(
            character_id = 11,
            group_id = 3,
        )
        cg12 = CharacterGroup(
            character_id = 12,
            group_id = 4,
        )
        cg13 = CharacterGroup(
            character_id = 13,
            group_id = 1,
        )
        cg14 = CharacterGroup(
            character_id = 14,
            group_id = 2,
        )
        cg15 = CharacterGroup(
            character_id = 15,
            group_id = 3,
        )
        cg16 = CharacterGroup(
            character_id = 16,
            group_id = 4,
        )



    session.bulk_save_objects([u1, u2, u3, u4, u5, u6, u7, u8, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, g1, g2, g3, g4, cg1, cg2, cg3, cg4, cg5, cg6, cg7, cg8, cg9, cg10, cg11, cg12, cg13, cg14, cg15, cg16])
    session.commit()
    session.close()
    
