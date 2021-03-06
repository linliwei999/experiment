// eslint-disable-next-line import/no-extraneous-dependencies
const city = require('./geographic/city.json');

const province = require('./geographic/province.json');

function getProvince(_, res) {
  return res.json({
    data: province,
  });
}

function getCity(req, res) {
  return res.json({
    data: city[req.params.province],
  });
}

function getCurrentUse(req, res) {
  return res.json({
    data: {
      name: '林立伟',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: '1060760148@qq.com',
      signature: '海纳百川，有容乃大',
      title: 'Front-end Developer..',
      group: `btoa('Hello World')`,
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      geographic: {
        province: {
          label: '福建省',
          key: '330000',
        },
        city: {
          label: '厦门市',
          key: '350200',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    },
  });
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET  /api/accountSettingCurrentUser': getCurrentUse,
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};
