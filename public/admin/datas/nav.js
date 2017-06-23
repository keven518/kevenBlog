var navs = [];

function nav () {
	return navs = [{
	"title": "基本元素",
	"icon": "fa-cubes",
	"spread": true,
	"children": [{
		"title": "按钮",
		"icon": "&#xe641;",
		"href": "button.html"
	}, {
		"title": "表单",
		"icon": "&#xe63c;",
		"href": "form.html"
	}, {
		"title": "表格",
		"icon": "&#xe63c;",
		"href": "table.html"
	}, {
		"title": "导航",
		"icon": "&#xe609;",
		"href": "nav.html"
	}, {
		"title": "Tab选项卡",
		"icon": "&#xe62a;",
		"href": "tab.html"
	}, {
		"title": "辅助性元素",
		"icon": "&#xe60c;",
		"href": "auxiliar.html"
	}]
}, {
	"title": "常用管理",
	"icon": "fa-cogs",
	"spread": false,
	"children": [{
		"title": "栏目管理",
		"icon": "fa-table",
		"href": "begtable.html"
	},{
		"title": "新增栏目",
		"icon": "fa-table",
		"href": "/admin/addCate"
	}]
},{
	"title": "内容管理",
	"icon": "fa-cogs",
	"spread": false,
	"children": [{
		"title": "Node",
		"icon": "fa-table",
		"href": "list.html"
	}, {
		"title": "Angular",
		"icon": "fa-navicon",
		"href": "navbar.html"
	}, {
		"title": "ReactJs",
		"icon": "&#xe628;",
		"href": "paging.html"
	}, {
		"title": "新增文章",
		"icon": "&#xe628;",
		"href": "/admin/addArticle"
	}]
}, {
	"title": "第三方组件",
	"icon": "&#x1002;",
	"spread": false,
	"children": [{
		"title": "iCheck组件",
		"icon": "fa-check-square-o",
		"href": "icheck.html"
	}]
}, {
		"title": "地址本",
		"icon": "fa-address-book",
		"href": "",
		"spread": false,
		"children": [
			{
				"title": "Github",
				"icon": "fa-github",
				"href": "https://www.github.com/"
			}, {
				"title": "QQ",
				"icon": "fa-qq",
				"href": "http://www.qq.com/"
			}, {
				"title": "Fly社区",
				"icon": "&#xe609;",
				"href": "http://fly.layui.com/"
			}, {
				"title": "新浪微博",
				"icon": "fa-weibo",
				"href": "http://weibo.com/"
			}
		]
	}];
}

nav ();