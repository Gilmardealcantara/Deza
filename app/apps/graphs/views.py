import os
from app import app
from flask import Blueprint, render_template, request
from config import APP_STATIC

mod = Blueprint('graphs', __name__, template_folder='templates', url_prefix='/graphs');

@mod.route('/area_chart')
def area():
	return render_template('graphs/area_chart.html')


@mod.route('/data')
def data_servise():
	name_file = request.args.get('graph')
	name_file = name_file if name_file else 'area.tsv'
	file_request = open(os.path.join(APP_STATIC, name_file))
	return ''.join(file_request.readlines())
