import sys
import os

# from werkzeug.debug import DebuggedApplication

# !!this is configuration for virtual env of your project:
# if you using some virtualenv interpreter - uncomment next three lines
# and add your own path to env's 'activate_this.py' file

#activate_this = "/home/padalko/python_enviroments/flask_test/bin/activate_this.py"
#activate_this = "/home/frutkic/venv/ecomap/bin/activate_this.py"

os.environ['PRODROOT'] = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ['CONFROOT'] = os.environ['PRODROOT'] + '/etc'
os.environ['PYSRCROOT'] = os.environ['PRODROOT'] + '/src/python'
os.environ['STATICROOT'] = os.environ['PRODROOT'] + '/www/'

#sys.path.insert(0, (os.path.join(os.environ['PRODROOT'], 'www')))

sys.path.insert(0, os.environ['PRODROOT'] + '/www')
sys.path.insert(1, os.environ['PYSRCROOT'])

print sys.path[:3]

from views import app as application

# application = DebuggedApplication(application, True)

