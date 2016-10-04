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


@mod.route('/stacked-d3plus')
def stacked_d3plus():
	return render_template('graphs/stacked-d3plus.html')


@mod.route('/treemap-d3plus')
def treemap_d3plus():
	return render_template('graphs/treemap-d3plus.html')



@mod.route('/data')
def data_servise():
	name_file = request.args.get('graph')
	name_file = name_file if name_file else 'area.tsv'
	file_request = open(os.path.join(APP_STATIC, name_file))
	return ''.join(file_request.readlines())


@mod.route('/dataviva/<dataset>/')
def dataviva(dataset):
	depth = request.args.get('depth')
	
	if dataset == 'bra':
		url = 'http://dataviva.info/attrs/'+dataset+'/'
	else:
		url = 'http://dataviva.info/'+dataset+'/all/show.'+depth+'/all/all/'

	response = requests.get(url)
	return jsonify(response.json())