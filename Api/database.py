from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "mysql+pymysql://user:password@mariadb_db:3306/order_management"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autoflush=False, bind=engine)
Base = declarative_base() 

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()