import { useState } from 'react';
import { DraggableArea } from 'react-draggable-tags';
import './index.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './index.less';

const Index = (props) => {
  const [tags, setTags] = useState([
    { id: 1, content: 'apple' },
    { id: 2, content: 'olive' },
    { id: 3, content: 'banana' },
    { id: 4, content: 'lemon' },
    { id: 5, content: 'orange' },
    { id: 6, content: 'grape' },
    { id: 7, content: 'strawberry' },
    { id: 8, content: 'cherry' },
    { id: 9, content: 'peach' },
  ]);

  const handleClickDelete = (tag) => {
    const tags = this.state.tags.filter((t) => tag.id !== t.id);
    this.setState({ tags });
  };

  return (
    <PageContainer content="块级拖拽">
      <Row gutter={16}>
        <Col xl={8} lg={12} md={12} sm={24} className={styles.item}>
          <Card
            title="列表拖拽"
            type="inner"
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <div className="row">
              <DraggableArea
                isList
                tags={tags}
                render={({ tag }) => <div className="tag">{tag.content}</div>}
                onChange={(tags) => {
                  console.log(tags);
                  setTags(tags);
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};
export default Index;
