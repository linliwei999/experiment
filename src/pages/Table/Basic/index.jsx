import { PageContainer } from '@ant-design/pro-layout';
import { useState, useCallback, useRef } from 'react';
import {
  Transfer,
  Switch,
  Table,
  Tag,
  Button,
  Card,
  Menu,
  Badge,
  Space,
  Dropdown,
  Divider,
  Skeleton,
} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

// 表格基础问题
const Index = (props) => {
  const [dataSource, setDataSource] = useState([]);

  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data = [];
  setTimeout(() => {
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      });
    }
    setDataSource([...data]);
  }, 1000);

  return (
    <PageContainer content="表格相关问题">
      <Card
        title="默认展开问题 defaultExpandAllRows失效"
        type="inner"
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        {/*<Divider orientation="left">没有默认展开原因</Divider>*/}
        当表格数据中有children字段,table会默认生成树形可展开表格,有时候需要一开始就默认展开,
        文档有一个属性defaultExpandAllRows默认展开所有行,但是设置这个之后并没有生效,
        原因是这个属性只在初始的时候加载一次,一般数据是从后台请求的,
        当时数据还没回来,数据回来时这个属性已经不会再次更新了. 如果是使用antd
        的table,可以在表格元素加一个判断,数据存在在渲染
        <Divider orientation="left"></Divider>
        {/*<Table*/}
        {/*  className="components-table-demo-nested"*/}
        {/*  columns={columns}*/}
        {/*  expandable={{ expandedRowRender }}*/}
        {/*  dataSource={dataSource}*/}
        {/*  defaultExpandAllRows={true}*/}
        {/*/>*/}
        <Skeleton active loading={dataSource.length === 0}>
          {dataSource && dataSource.length > 0 && (
            <Table
              className="components-table-demo-nested"
              columns={columns}
              expandable={{ expandedRowRender }}
              dataSource={dataSource}
              defaultExpandAllRows={true}
            />
          )}
        </Skeleton>
      </Card>
    </PageContainer>
  );
};
export default Index;
