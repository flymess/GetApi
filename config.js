/**
 * Created by tao on 2017/7/31.
 */
const config = [
  {
    name: '主页',
	list: [
	  {
		name: '今日任务',
		api: 'getRement',
		query: ['ss','ff'],
		body: [],
		method: 'GET'
	  },
	  {
	    name: '个人画像',
		api: 'getImage',
		query: ['age','name'],
		body: ['pass'],
		method: 'POST'
	  }
	]
  },
  {
    name: '作业考试',
	list: [
	  {
	    name: '待完成',
		api: 'waitOK/{id}/comit/{age}',
		method: 'GET',
		body:[],
		params: ['id','age'],
		query: ['age']
	  }
	]
  }
]

const url = 'http://baidu/com/api'