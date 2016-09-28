import os
import requests
from app import app
from flask import Blueprint, render_template, request, jsonify
from config import APP_STATIC

mod = Blueprint('graphs', __name__, template_folder='templates', url_prefix='/graphs');

@mod.route('/area_chart')
def area():
	return render_template('graphs/area_chart.html')

	
@mod.route('/stack')
def stack():
	return render_template('graphs/stack.html')


@mod.route('/stacked')
def stacked():
	return render_template('graphs/stacked.html')


@mod.route('/treemap')
def treemap():
	return render_template('graphs/treemap.html')


@mod.route('/data')
def data_servise():
	name_file = request.args.get('graph')
	name_file = name_file if name_file else 'area.tsv'
	file_request = open(os.path.join(APP_STATIC, name_file))
	return ''.join(file_request.readlines())


@mod.route('/dataviva')
def dataviva():
	response = requests.get('http://dataviva.info/sc/all/show.9/all/all/')
	return jsonify(response.json())