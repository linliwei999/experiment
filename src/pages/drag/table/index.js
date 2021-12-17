import { PageContainer } from '@ant-design/pro-layout';
import { useState, useCallback, useRef } from 'react';
import { Transfer, Switch, Table, Tag, Button, Card } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

// 穿梭表格拖拽问题
const Index = (props) => {
  const mockTags = ['cat', 'dog', 'bird'];
  const mockData = [];
  const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key);
  for (let i = 0; i < 6; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      disabled: i % 4 === 0,
      tag: mockTags[i % 3],
    });
  }
  const [targetKeys, setTargetKeys] = useState(originTargetKeys);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([]);

  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'tag',
      title: 'Tag',
      render: (tag) => <Tag>{tag}</Tag>,
    },
    {
      dataIndex: 'description',
      title: 'Description',
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'title',
      align: 'center',
      title: '操作',
      render: (value, data, index) => {
        return (
          <>
            <Button
              type="link"
              onClick={(e) => {
                console.log(index);
              }}
            >
              上移
            </Button>
            <Button type="link">下移</Button>
          </>
        );
      },
    },
  ];

  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const triggerDisable = (disabled) => {
    setDisabled(disabled);
  };

  const triggerShowSearch = (showSearch) => {
    setShowSearch(showSearch);
  };

  const type = 'DraggableBodyRow';

  const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    if (document.getElementsByClassName('ant-transfer-list-body-search-wrapper').length > 0) {
      document.getElementsByClassName('ant-transfer-list-body-search-wrapper')[1].style.display =
        'none';
    }
    const ref = useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
        };
      },
      drop: (item) => {
        moveRow(item.index, index);
      },
    });
    const [, drag] = useDrag({
      type,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    drop(drag(ref));

    return (
      <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ''}`}
        style={{ cursor: 'move', ...style }}
        {...restProps}
      />
    );
  };

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
      console.log('data', data);
      console.log('dragIndex', dragIndex);
      console.log('hoverIndex', hoverIndex);
      console.log('dragRow', dragRow);
    },
    [data],
  );

  // Customize Table Transfer
  const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected;
            //   ? difference(treeSelectedKeys, listSelectedKeys)
            //   : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <>
            <DndProvider backend={HTML5Backend}>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                components={components}
                dataSource={filteredItems}
                size="small"
                style={{ pointerEvents: listDisabled ? 'none' : null }}
                onRow={({ key, disabled: itemDisabled }) => ({
                  onClick: () => {
                    if (itemDisabled || listDisabled) return;
                    onItemSelect(key, !listSelectedKeys.includes(key));
                  },
                  moveRow,
                  // moveRow: (...restProps, filteredItems)=>{moveRow()}
                })}
              />
            </DndProvider>
          </>
        );
      }}
    </Transfer>
  );

  const DTable = () => {
    const type = 'DraggableBodyRow';
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    const [data, setData] = useState([
      {
        key: '1',
        name: '1',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: '2',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: '3',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ]);

    const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
      const ref = useRef();
      const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
          const { index: dragIndex } = monitor.getItem() || {};
          if (dragIndex === index) {
            return {};
          }
          return {
            isOver: monitor.isOver(),
            dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
          };
        },
        drop: (item) => {
          moveRow(item.index, index);
        },
      });
      const [, drag] = useDrag({
        type,
        item: { index },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });
      drop(drag(ref));

      return (
        <tr
          ref={ref}
          className={`${className}${isOver ? dropClassName : ''}`}
          style={{ cursor: 'move', ...style }}
          {...restProps}
        />
      );
    };

    const components = {
      body: {
        row: DraggableBodyRow,
      },
    };

    const moveRow = useCallback(
      (dragIndex, hoverIndex) => {
        const dragRow = data[dragIndex];
        setData(
          update(data, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragRow],
            ],
          }),
        );
        console.log('data', data);
        console.log('dragIndex', dragIndex);
        console.log('hoverIndex', hoverIndex);
        console.log('dragRow', dragRow);
      },
      [data],
    );

    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          columns={columns}
          dataSource={data}
          components={components}
          onRow={(record, index) => ({
            index,
            moveRow,
          })}
        />
      </DndProvider>
    );
  };

  return (
    <PageContainer content="表格拖拽相关问题">
      <Card
        title="穿梭表格 + 拖拽问题"
        type="inner"
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <TableTransfer
          dataSource={mockData}
          targetKeys={targetKeys}
          disabled={disabled}
          showSearch={true}
          onChange={onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
        />
        {/*<Switch*/}
        {/*  unCheckedChildren="disabled"*/}
        {/*  checkedChildren="disabled"*/}
        {/*  checked={disabled}*/}
        {/*  onChange={triggerDisable}*/}
        {/*  style={{ marginTop: 16 }}*/}
        {/*/>*/}
        {/*<Switch*/}
        {/*  unCheckedChildren="showSearch"*/}
        {/*  checkedChildren="showSearch"*/}
        {/*  checked={showSearch}*/}
        {/*  onChange={triggerShowSearch}*/}
        {/*  style={{ marginTop: 16 }}*/}
        {/*/>*/}
      </Card>
    </PageContainer>
  );
};
export default Index;
