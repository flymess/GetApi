/**
 * Created by tao on 2017/7/31.
 */
const sdk = {
  model: {
    '主页': 'arr0',
	'作业考试': 'arr1'
  },
  list: {
	'arr0': [
	  {
		'name': '今日任务',
		'url': 'getRement',
		'method': 'GET',
		'query': ['ss', 'ff']
	  },
	  {
		'name': '个人画像',
		'url': 'getImage',
		'method': 'POST',
		'query': ['age', 'name']
	  }
	],
	'arr1': [
	  {
		'name': '待完成',
		'url': 'waitOK',
		'method': 'GET',
		'query': ['token', 'name']
	  },
	  {
		'name': '已完成',
		'url': 'OK',
		'method': 'GET',
		'query': ['name', 'type']
	  },
	  {
		'name': '学情报告',
		'url': 'detail',
		'method': 'POST',
		'query': []
	  }
	]
  },
  url: 'http://baidu.com/api/'
}