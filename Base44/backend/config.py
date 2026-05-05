"""
Backend configuration
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Base configuration"""
    DEBUG = False
    TESTING = False
    CORS_HEADERS = 'Content-Type'


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False
    FLASK_ENV = 'development'
    SERVER_PORT = int(os.getenv('FLASK_PORT', 5000))


class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = True


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False


# Select config based on environment
config = os.getenv('FLASK_ENV', 'development')
if config == 'testing':
    current_config = TestingConfig
elif config == 'production':
    current_config = ProductionConfig
else:
    current_config = DevelopmentConfig
