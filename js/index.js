/**
 * Created by tao on 2017/8/2.
 */
var list = $('#list')
var model = $('#model')
var query = $('#query')
var apiList = {}
var count = 0

/**
 * 初始化select和参数列表
 * */
function Initialization() {
  [].map.call(config, (item, index) => {
	var Node = `<option value="${item.name}">${item.name}</option>`
	model.append(Node)
  })

  setList()
  setQueryList()
}
/**
 * 初始化填写的参数
 * */
function setQueryList() {
  var queryParams = list.find('option:selected').attr('query')
  var body = list.find('option:selected').attr('body')
  var params = list.find('option:selected').attr('params')

  var queryList = queryParams.split(',')
  var bodyList = body.split(',')
  var paramsList = params.split(',')

  query.children().remove()

  appendPathList(queryList, 'query')
  appendPathList(bodyList, 'body')
  appendPathList(paramsList, 'params')
}
/**
 * 循环参数数组创建dom
 * @param list
 * @param className 类名
 * */
function appendPathList(list, className) {
  [].map.call(list, (item, index) => {
	if (!item || item === 'undefined') {
	  return
	}

	var _label = `<label class="title">${item}:</label>`
	var _input = `<input name="${item}" class="${className}"/><br>`

	query.append(_label)
	query.append(_input)
  })
}
/**
 * 循环创建二级select的选项
 * */
function setList() {
  var key = model.val()
  list.find('option').remove();

  [].map.call(config, (item, index) => {
	if (item.name == key) {
	  apiList = item.list
	}
  });

  [].map.call(apiList, (item, index) => {
	var Node = `<option value="${item.api}" method="${item.method}" query="${item.query}" body="${item.body}" params="${item.params}">${item.name}</option>`
	list.append(Node)
  })

  setQueryList()
}
/**
 * 循环创建参数的集合对象
 * @param className 类名
 * @param list 参数集合对象
 * */
function setParamsList(className, list) {
  query.find(className).each(function () {
	var name = $(this).attr('name')
	var value = $(this).val()

	list[name] = value
  });
}
/**
 * 根据api请求返回的数据进行格式化显示,同时显示接口信息，最多显示五条记录,大于5个自动顶掉最后一个
 * @param data json数据
 * @param Url 接口链接
 * @param modelName 模块名
 * @param apiName 接口名
 * */
function createJsonList(data, Url, modelName, apiName) {
  var index = $('#json').children().length
  if (index >= 5) {
	$('#json .content:last-child').remove()
  }
  $('#json').prepend(`<div class="content"><p>${modelName}/${apiName}</p><p>${Url}</p><div id="jsonList${count}"></div></div>`)
  $(`#jsonList${count}`).JSONView(data, {collapsed: true})
  count++
}
/**
 * 发送请求方法
 * */
function SendApi() {
  $('#send').on('click', function (e) {
	var control = list.find('option:selected')
	var method = control.attr('method')
	var api = control.val()
	var queryList = {}
	var bodyList = {}
	var paramsList = {}
	var modelName = model.val()
	var apiName = list.find('option:selected').text()

	setParamsList('.query', queryList)
	setParamsList('.body', bodyList)
	setParamsList('.params', paramsList)

	var url = 'https://api.avgle.com/v1/collections/' + api;

	for (var key in paramsList) {
	  url = url.replace(new RegExp(`{${key}}`), paramsList[key])
	}

	if (method == "GET") {
	  axios.get(url, {
		params: queryList
	  })
		.then((res) => {
		  createJsonList(res.data, url, modelName, apiName)
		})
	} else {
	  axios.post(url, {
		data: bodyList
	  })
	}

  })
}

window.onload = function () {
  Initialization()
  SendApi()
  model.on('change', setList)
  list.on('change', setQueryList)
}