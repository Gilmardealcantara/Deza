import os
import requests
from app import app
from flask import Blueprint, render_template, request, jsonify, make_response
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


@mod.route('/geomap-d3plus')
def geomap_d3plus():
	url = 'http://dataviva.info/attrs/bra/'
	response = requests.get(url)
	data = []
	for row in response.json()['data']:
		if len(row['id']) == 3:
			data.append([row['id'], row['name']]); 

	return render_template('graphs/geomap-d3plus.html', data=data)


@mod.route('/data')
def data_servise():
	name_file = request.args.get('graph')
	name_file = name_file if name_file else 'area.tsv'
	file_request = open(os.path.join(APP_STATIC, name_file))
	return ''.join(file_request.readlines())


@mod.route('/dataviva/<dataset>/')
def dataviva(dataset):
	depth = request.args.get('depth')
	
	if dataset in ['bra', 'wld']:
		url = 'http://dataviva.info/attrs/'+dataset+'/'
	else:
		url = 'http://dataviva.info/'+dataset+'/all/show.'+depth+'/all/all/'
	response = requests.get(url)
	return jsonify(response.json())


@mod.route('/coords/<id>/')
def coords(id="all"):
	
	if id == "all":
		file_name = "bra_states.json.gz"
	else:
		file_name = ("{0}_munic.json.gz").format(id)

	path = ( APP_STATIC.replace('data', 'app') +  "/static/json/coords/{0}" ).format(file_name)

	gzip_file = open(path).read()
	ret = make_response(gzip_file)
	
	ret.headers['Content-Encoding'] = "gzip"
	ret.headers['Content-Length'] = str(len(ret.data))
	return ret