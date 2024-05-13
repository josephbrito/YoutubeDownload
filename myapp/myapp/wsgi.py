"""
WSGI config for myapp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

from whitenoise import WhiteNoise



import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myapp.settings')

application = get_wsgi_application()
application = WhiteNoise(application, root="youtube/static")

application.add_files("youtube/static/assets/*", prefix="more-files-assets/")
application.add_files("youtube/static/css/*", prefix="more-files-css/")
application.add_files("youtube/static/js/*", prefix="more-files-js/")

app = application
