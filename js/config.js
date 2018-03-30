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
  'headerTitle': '匠人牛品管理后台',
  'headerLogo': 'url("data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSgBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIACgAKAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APqmgAoAKACgAoAwfGHiiz8K2CXd9Dcyoxx+6VQq+7yOVRByOWYZ7ZoAk8Ja8fEekx6gunXdlbzKrwGd4m85CMh1MbsMH3x69KAGa74t0TQr1bPUr5I7xrWW8W3UF5DFEpZ22gE4wD9cYGTQBW8UeMrDQPAcvixobq705IIrgJDHiRo5CoB2tjGAwJzggA0Aavh3V4de0Oy1W1iuIYLuISolxHscKemRQB5J8Rv+ElfxddWzf27HYiC4a1u9Ns3lWSOSOAC3LxqWjPmRSEsPmwRjqRQBi61qmoaF8PdH8G3w13TQ0atq2pMxurmOyXHnzJsMjIrOwRdwyq7sqNtAEvxD8MQaz4d1vW/C99Nq32yzZlubPUFi8q1itNqRO2Gkk3P5jbRtDFsP0zQB0GuaF4wF9oGgSQWF54cmgS3uEtrX/R4lVmDrIskhO0xsmGJc7ozgLuyACx8K7jxDZeJbnTNdUxQeU0VvFPchT5cLmNXit0hWONGwcfNkgAgEDNLmV+XqaKlNw9pbTY9ZpmYwQxCdphGnnMoQvtG4qCSBn05P50Ac1pPgDwto+qXGp6RodjY6jOSWuYIgrjPXaf4c98YzQBsjTnCOp1C9O7ody5X6fL/OgCnD4ejj1+HVWvLqWWO3+z7JCpVvmYhjgZyN7D6Go5Pe5jdV2qPsbdb36/1ojbqzAKACgAoAKAP/2Q==")',
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

