var app = {};

/*
 * appName 暂时没用
 *
 * headerTitle 如果是汉字最多是 8 个汉字，
 *   如果是英文字母或者英文和中文混合，
 *   还没有测试多少个合适
 * 
 * headerLogo 图片是 40 * 40 的图片
 *
 */

app.config = {
  'appName': '管理后台',
  'appContainer': '#admin-app',
  'panelContainer': '.admin-app-stage',
  'headerTitle': '管理后台',
  'headerLogo': 'url("data:image/png;base64,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")',
};

/* menuData 是左侧菜单栏数据，
 *   菜单栏只支持二级菜单
 */
app.menuData = [
  {
    'title': '门店管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '门店列表',
        'url': '#/store-list'
      }
    ]
  },
  {
    'title': '活动管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '首次关注送券',
        'url': '05-button.html'
      },
      {
        'title': '微信商品券',
        'url': '04-button.html'
      },
      {
        'title': '微信立减券',
        'url': '01-button.html'
      },
      {
        'title': '微信折扣券',
        'url': '02-button.html'
      }
    ]
  },
  {
    'title': '会员卡管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '会员卡详情',
        'url': '00-field-validation.html'
      },
      {
        'title': '会员列表',
        'url': '01-char-validation.html'
      }
    ]
  },
  {
    'title': '订单管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '订单列表',
        'url': '01-echart.html'
      }
    ]
  },
  {
    'title': '对账管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '门店对账',
        'url': '01-button/09-index.html'
      },
      {
        'title': '活动数据统计',
        'url': '02-password/01-index.html'
      },
      {
        'title': '储值消费详情',
        'url': '01-button/10-index.html'
      }
    ]
  },
  {
    'title': '储值管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '储值规则',
        'url': 'index.html'
      },
      {
        'title': '储值记录',
        'url': 'index.html'
      },
      {
        'title': '储值退款记录',
        'url': 'index.html'
      },
      {
        'title': '储值退款审核',
        'url': 'index.html'
      }
    ]
  },
  {
    'title': '商城',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '商品管理',
        'url': '01-local-storage.html'
      },
      {
        'title': '订单查询',
        'url': '02-history.html'
      },
    ]
  },
  {
    'title': '卡券核销记录',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '微信卡券核销记录',
        'url': '01-range.html'
      }
    ]
  },
  {
    'title': '统计管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '订单统计',
        'url': '01-range.html'
      },
      {
        'title': '用户统计',
        'url': '01-range.html'
      }
    ]
  },
  {
    'title': '密码管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '修改密码',
        'url': '#/change-password'
      }
    ]
  }
];

