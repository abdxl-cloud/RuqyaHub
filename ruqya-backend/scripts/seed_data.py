"""Seed database with initial data."""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.database import SessionLocal
from app.models.user import User, UserRole
from app.models.service import Service
from app.models.article import Article
from app.models.podcast import Podcast
from app.models.audio import Audio
from app.models.product import Product
from app.core.security import get_password_hash
from datetime import datetime, timedelta
from slugify import slugify
import uuid


def seed_users(db):
    """Seed users."""
    print("👤 Seeding users...")
    
    # Check if admin exists
    admin = db.query(User).filter(User.email == "admin@ruqyahealinghub.com").first()
    
    if not admin:
        admin = User(
            id=str(uuid.uuid4()),
            email="admin@ruqyahealinghub.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User",
            phone="+1234567890",
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin)
        print("  ✅ Admin user created")
    else:
        print("  ⏭️  Admin user already exists")
    
    # Create test user
    test_user = db.query(User).filter(User.email == "user@example.com").first()
    if not test_user:
        test_user = User(
            id=str(uuid.uuid4()),
            email="user@example.com",
            hashed_password=get_password_hash("user123"),
            full_name="Test User",
            phone="+1234567891",
            role=UserRole.USER,
            is_active=True
        )
        db.add(test_user)
        print("  ✅ Test user created")


def seed_services(db):
    """Seed services."""
    print("🛠️  Seeding services...")
    
    services_data = [
        {
            "title": "Ruqya Session",
            "description": "Comprehensive Islamic spiritual healing session with recitation of Quranic verses",
            "icon": "book-open",
            "duration": 60,
            "price": 50.00
        },
        {
            "title": "Evil Eye Treatment",
            "description": "Specialized treatment for evil eye (al-ayn) with prescribed duas and protection",
            "icon": "eye",
            "duration": 45,
            "price": 40.00
        },
        {
            "title": "Black Magic Removal",
            "description": "Complete treatment for removing effects of black magic (sihr) through Islamic means",
            "icon": "shield",
            "duration": 90,
            "price": 75.00
        },
        {
            "title": "Jinn Possession Treatment",
            "description": "Treatment for jinn possession with Quranic recitation and Islamic methodology",
            "icon": "flame",
            "duration": 120,
            "price": 100.00
        },
        {
            "title": "Consultation",
            "description": "Initial consultation to diagnose spiritual issues and recommend treatment plan",
            "icon": "message-circle",
            "duration": 30,
            "price": 25.00
        },
        {
            "title": "Home Visit",
            "description": "Ruqya treatment performed at your home for severe cases",
            "icon": "home",
            "duration": 120,
            "price": 150.00
        }
    ]
    
    for service_data in services_data:
        existing = db.query(Service).filter(Service.title == service_data["title"]).first()
        if not existing:
            service = Service(
                id=str(uuid.uuid4()),
                **service_data
            )
            db.add(service)
    
    print("  ✅ Services seeded")


def seed_articles(db):
    """Seed articles."""
    print("📝 Seeding articles...")
    
    articles_data = [
        {
            "title": "Understanding the Evil Eye in Islam",
            "content": """The evil eye (al-ayn) is a reality confirmed in Islamic teachings. The Prophet Muhammad (peace be upon him) said: "The evil eye is real, and if anything were to overtake the divine decree, it would be the evil eye."

## What is the Evil Eye?

The evil eye occurs when a person looks at something with envy or admiration, whether intentionally or unintentionally, and this gaze can cause harm to the person or thing being observed.

## Signs of Evil Eye

Common signs include:
- Sudden illness without medical cause
- Unexplained fatigue and weakness
- Loss of appetite
- Difficulty sleeping or nightmares
- Sudden changes in mood or behavior
- Financial losses or business problems

## Protection from Evil Eye

1. **Recite Ayat al-Kursi** - After every prayer
2. **Say Bismillah** - Before any action
3. **Recite Surah Al-Falaq and An-Nas** - Morning and evening
4. **Use Ruqya water** - Water recited with Quranic verses
5. **Maintain regular prayers** - Five daily prayers
6. **Give charity** - Regular sadaqah provides protection

## Treatment

If affected by evil eye, seek Islamic Ruqya treatment immediately. A qualified practitioner will recite specific Quranic verses and prescribed duas to remove the effects.""",
            "excerpt": "Learn about the reality of the evil eye in Islam, its signs, and how to protect yourself through authentic Islamic methods.",
            "category": "Evil Eye",
            "author": "Sheikh Ahmad",
            "read_time": 5
        },
        {
            "title": "Signs of Black Magic (Sihr)",
            "content": """Black magic (sihr) is a serious spiritual affliction that requires immediate attention and treatment through Islamic means.

## What is Black Magic?

Sihr is when someone seeks the help of devils and jinn to harm others. It's explicitly forbidden in Islam and is considered a major sin.

## Common Signs

### Physical Signs
- Severe headaches that don't respond to medication
- Pain in lower back or stomach
- Tightness in the chest
- Unexplained body pains

### Mental Signs
- Excessive anger without reason
- Extreme love or hatred for spouse
- Inability to focus or concentrate
- Forgetfulness and confusion

### Behavioral Signs
- Sudden personality changes
- Withdrawing from worship
- Nightmares and disturbing dreams
- Hearing voices or seeing things

### Marital Issues
- Unexplained hatred between spouses
- Inability to consummate marriage
- Constant arguments and fights

## What to Do

1. **Maintain regular prayers** - Never miss Salah
2. **Recite Quran daily** - Especially Surah Al-Baqarah
3. **Seek Ruqya treatment** - From a qualified practitioner
4. **Make dua consistently** - Ask Allah for healing
5. **Stay away from sins** - Magic has no effect on the righteous

## Important Note

Never seek help from magicians or fortune tellers. Only seek treatment through Islamic Ruqya.""",
            "excerpt": "Identify the signs of black magic and learn the Islamic approach to treatment and protection.",
            "category": "Black Magic",
            "author": "Sheikh Ahmad",
            "read_time": 7
        },
        {
            "title": "The Power of Surah Al-Baqarah",
            "content": """Surah Al-Baqarah is the longest chapter of the Quran and holds tremendous blessings and protection.

## Benefits of Surah Al-Baqarah

The Prophet (peace be upon him) said: "Do not turn your houses into graves. Verily, Satan does not enter the house in which Surah Al-Baqarah is recited."

### Protection from Evil

- Protects from magic and evil eye
- Drives away devils and jinn
- Creates a shield around your home
- Protects from harm during sleep

### Spiritual Benefits

- Increases faith and certainty
- Brings barakah to your life
- Intercedes for the reciter on Day of Judgment
- Contains Ayat al-Kursi, the greatest verse

## How to Use for Protection

1. **Recite daily** - Even if divided into sections
2. **Play audio at home** - Especially at night
3. **Memorize key verses** - Ayat al-Kursi and last two verses
4. **Recite over water** - Drink and bathe with it
5. **Teach your family** - Make it a household practice

## The Last Two Verses

The last two verses (285-286) are particularly powerful. The Prophet (peace be upon him) said: "Whoever recites the last two verses of Surah Al-Baqarah at night, they will be sufficient for him."

Recite these verses every night before sleeping for complete protection.""",
            "excerpt": "Discover the immense power and blessings of Surah Al-Baqarah in protecting against spiritual harm.",
            "category": "Quranic Healing",
            "author": "Sheikh Ahmad",
            "read_time": 6
        },
        {
            "title": "Jinn Possession: Facts and Treatment",
            "content": """Jinn possession is a reality in Islam, but it's often misunderstood. Let's clarify the facts and proper treatment.

## Can Jinn Possess Humans?

Yes, jinn can possess humans as confirmed by Quran and Sunnah. Allah says: "Those who consume interest...will stand on the Day of Resurrection like one who is beaten by Satan into insanity." (Quran 2:275)

## Types of Possession

### External Possession
Jinn affects person from outside, causing physical or mental symptoms without entering the body.

### Internal Possession
Jinn enters the body and controls the person's actions and speech.

## Signs of Possession

1. **During Consciousness**
   - Hearing voices
   - Unexplained anger
   - Hallucinations
   - Aversion to worship
   - Extreme personality changes

2. **During Sleep**
   - Terrifying nightmares
   - Sleep paralysis
   - Feeling pressure on chest
   - Seeing dark figures

3. **During Ruqya**
   - Violent reactions to Quran
   - Speaking in different voice
   - Convulsions or fainting
   - Abnormal body movements

## Islamic Treatment

### Step 1: Strengthen Faith
- Pray five daily prayers
- Read Quran regularly
- Make dhikr constantly
- Stay away from sins

### Step 2: Seek Ruqya
- Find qualified practitioner
- Attend regular sessions
- Follow prescribed treatment
- Be patient with process

### Step 3: Home Treatment
- Recite Ayat al-Kursi
- Play Surah Al-Baqarah
- Use Ruqya water
- Keep house clean spiritually

## Important Warnings

- Never go to magicians or fortune tellers
- Don't use amulets or talismans
- Avoid places of major sins
- Don't give up if treatment takes time

## Prevention

The best cure is prevention:
1. Maintain regular prayers
2. Recite morning and evening adhkar
3. Say Bismillah before actions
4. Keep home free from prohibited things
5. Play Quran regularly at home""",
            "excerpt": "Understand jinn possession from an Islamic perspective and learn authentic treatment methods.",
            "category": "Jinn",
            "author": "Sheikh Ahmad",
            "read_time": 8
        }
    ]
    
    for article_data in articles_data:
        slug = slugify(article_data["title"])
        existing = db.query(Article).filter(Article.slug == slug).first()
        
        if not existing:
            article = Article(
                id=str(uuid.uuid4()),
                slug=slug,
                is_published=True,
                published_at=datetime.utcnow() - timedelta(days=30),
                **article_data
            )
            db.add(article)
    
    print("  ✅ Articles seeded")


def seed_podcasts(db):
    """Seed podcasts."""
    print("🎙️  Seeding podcasts...")
    
    podcasts_data = [
        {
            "title": "Introduction to Ruqya",
            "description": "A comprehensive introduction to Islamic spiritual healing and the importance of Ruqya in a Muslim's life.",
            "duration": 1800,  # 30 minutes
            "audio_url": "/uploads/podcasts/intro-to-ruqya.mp3",
            "cover_image": "/uploads/images/podcast-intro.jpg"
        },
        {
            "title": "Protection from Evil Eye",
            "description": "Learn the authentic Islamic methods to protect yourself and your family from the evil eye.",
            "duration": 2100,  # 35 minutes
            "audio_url": "/uploads/podcasts/evil-eye-protection.mp3",
            "cover_image": "/uploads/images/podcast-evil-eye.jpg"
        },
        {
            "title": "Understanding Black Magic",
            "description": "Deep dive into the reality of black magic in Islam and how to recognize and treat it.",
            "duration": 2400,  # 40 minutes
            "audio_url": "/uploads/podcasts/black-magic.mp3",
            "cover_image": "/uploads/images/podcast-sihr.jpg"
        }
    ]
    
    for podcast_data in podcasts_data:
        existing = db.query(Podcast).filter(Podcast.title == podcast_data["title"]).first()
        
        if not existing:
            podcast = Podcast(
                id=str(uuid.uuid4()),
                is_published=True,
                published_at=datetime.utcnow() - timedelta(days=20),
                **podcast_data
            )
            db.add(podcast)
    
    print("  ✅ Podcasts seeded")


def seed_audio(db):
    """Seed audio files."""
    print("🔊 Seeding audio files...")
    
    audio_data = [
        {
            "title": "Surah Al-Baqarah",
            "reciter": "Sheikh Mishary Rashid",
            "description": "Complete recitation of Surah Al-Baqarah for protection and healing",
            "category": "General Ruqya",
            "duration": 8400,  # 140 minutes
            "audio_url": "/uploads/audio/surah-baqarah.mp3"
        },
        {
            "title": "Ayat Al-Kursi",
            "reciter": "Sheikh Mishary Rashid",
            "description": "The greatest verse of the Quran, essential for daily protection",
            "category": "General Ruqya",
            "duration": 120,  # 2 minutes
            "audio_url": "/uploads/audio/ayat-kursi.mp3"
        },
        {
            "title": "Ruqya for Evil Eye",
            "reciter": "Sheikh Ahmad Al-Ajmi",
            "description": "Specific Quranic verses and duas for treating evil eye",
            "category": "Evil Eye",
            "duration": 1800,  # 30 minutes
            "audio_url": "/uploads/audio/ruqya-evil-eye.mp3"
        },
        {
            "title": "Ruqya for Black Magic",
            "reciter": "Sheikh Ahmad Al-Ajmi",
            "description": "Powerful Ruqya specifically for breaking black magic",
            "category": "Black Magic",
            "duration": 2700,  # 45 minutes
            "audio_url": "/uploads/audio/ruqya-sihr.mp3"
        },
        {
            "title": "Ruqya for Jinn",
            "reciter": "Sheikh Saad Al-Ghamdi",
            "description": "Complete Ruqya treatment for jinn possession",
            "category": "Jinn",
            "duration": 3600,  # 60 minutes
            "audio_url": "/uploads/audio/ruqya-jinn.mp3"
        },
        {
            "title": "Morning Adhkar",
            "reciter": "Sheikh Mishary Rashid",
            "description": "Morning remembrance for daily protection",
            "category": "General Ruqya",
            "duration": 900,  # 15 minutes
            "audio_url": "/uploads/audio/morning-adhkar.mp3"
        },
        {
            "title": "Evening Adhkar",
            "reciter": "Sheikh Mishary Rashid",
            "description": "Evening remembrance for nighttime protection",
            "category": "General Ruqya",
            "duration": 900,  # 15 minutes
            "audio_url": "/uploads/audio/evening-adhkar.mp3"
        }
    ]
    
    for audio_item in audio_data:
        existing = db.query(Audio).filter(Audio.title == audio_item["title"]).first()
        
        if not existing:
            audio = Audio(
                id=str(uuid.uuid4()),
                is_published=True,
                **audio_item
            )
            db.add(audio)
    
    print("  ✅ Audio files seeded")


def seed_products(db):
    """Seed products."""
    print("🛒 Seeding products...")
    
    products_data = [
        {
            "name": "Zamzam Water (5L)",
            "description": "Authentic Zamzam water from Mecca, blessed and purified. Perfect for Ruqya treatment and daily consumption.",
            "price": 25.00,
            "stock_quantity": 50,
            "image": "/uploads/products/zamzam-water.jpg"
        },
        {
            "name": "Black Seed Oil (100ml)",
            "description": "Pure black seed oil (Nigella Sativa) as recommended by the Prophet (PBUH). Known for its healing properties.",
            "price": 15.00,
            "stock_quantity": 100,
            "image": "/uploads/products/black-seed-oil.jpg"
        },
        {
            "name": "Sidr Leaves (100g)",
            "description": "Natural Sidr leaves for Ruqya baths and treatment. Used in Islamic spiritual healing for centuries.",
            "price": 10.00,
            "stock_quantity": 75,
            "image": "/uploads/products/sidr-leaves.jpg"
        },
        {
            "name": "Ruqya Water Kit",
            "description": "Complete kit with bottle, Quranic verses, and instructions for preparing Ruqya water at home.",
            "price": 20.00,
            "stock_quantity": 60,
            "image": "/uploads/products/ruqya-kit.jpg"
        },
        {
            "name": "Miswak (Natural Toothbrush)",
            "description": "Traditional Miswak stick from Arak tree. Sunnah of the Prophet and excellent for oral hygiene.",
            "price": 5.00,
            "stock_quantity": 200,
            "image": "/uploads/products/miswak.jpg"
        },
        {
            "name": "Prayer Beads (Tasbih)",
            "description": "33-bead tasbih for dhikr and remembrance of Allah. Made from natural wood.",
            "price": 8.00,
            "stock_quantity": 150,
            "image": "/uploads/products/tasbih.jpg"
        },
        {
            "name": "Dates - Ajwa (500g)",
            "description": "Premium Ajwa dates from Madinah. The Prophet said: 'He who eats seven Ajwa dates every morning, will not be harmed by poison or magic.'",
            "price": 30.00,
            "stock_quantity": 40,
            "image": "/uploads/products/ajwa-dates.jpg"
        },
        {
            "name": "Olive Oil (250ml)",
            "description": "Extra virgin olive oil, blessed and pure. Can be used for Ruqya treatment and cooking.",
            "price": 12.00,
            "stock_quantity": 80,
            "image": "/uploads/products/olive-oil.jpg"
        },
        {
            "name": "Islamic Books Bundle",
            "description": "Collection of authentic Islamic books on Ruqya, protection, and spiritual healing.",
            "price": 45.00,
            "stock_quantity": 30,
            "image": "/uploads/products/books-bundle.jpg"
        }
    ]
    
    for product_data in products_data:
        existing = db.query(Product).filter(Product.name == product_data["name"]).first()
        
        if not existing:
            product = Product(
                id=str(uuid.uuid4()),
                **product_data
            )
            db.add(product)
    
    print("  ✅ Products seeded")


def main():
    """Main seeding function."""
    print("\n" + "="*60)
    print("🌱 SEEDING DATABASE")
    print("="*60 + "\n")
    
    db = SessionLocal()
    
    try:
        seed_users(db)
        seed_services(db)
        seed_articles(db)
        seed_podcasts(db)
        seed_audio(db)
        seed_products(db)
        
        db.commit()
        
        print("\n" + "="*60)
        print("✅ DATABASE SEEDED SUCCESSFULLY!")
        print("="*60)
        print("\n📊 Summary:")
        print(f"  • Users: {db.query(User).count()}")
        print(f"  • Services: {db.query(Service).count()}")
        print(f"  • Articles: {db.query(Article).count()}")
        print(f"  • Podcasts: {db.query(Podcast).count()}")
        print(f"  • Audio Files: {db.query(Audio).count()}")
        print(f"  • Products: {db.query(Product).count()}")
        print("\n🔑 Admin Credentials:")
        print("  • Email: admin@ruqyahealinghub.com")
        print("  • Password: admin123")
        print("\n⚠️  Please change the admin password after first login!")
        print("="*60 + "\n")
        
    except Exception as e:
        print(f"\n❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
