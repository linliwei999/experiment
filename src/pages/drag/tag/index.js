import { PageContainer } from '@ant-design/pro-layout';
import { useState } from "react";
import { Card } from 'antd';
import {DraggableArea} from 'react-draggable-tags';
import './index.less';

const Index = () => {
  const [ tags, setTags ] = useState( [
    {id: 1, content: 'apple'}, {id: 2, content: 'olive'}, {id: 3, content: 'banana'},
    {id: 4,  content: 'lemon'}, {id: 5, content: 'orange'}, {id: 6, content: 'grape'},
    {id: 7, content: 'strawberry'}, {id: 8, content: 'cherry'}, {id: 9, content: 'peach'}
  ])

  const handleClickDelete = (tag) => {
    const tags = this.state.tags.filter(t => tag.id !== t.id);
    this.setState({tags});
  }

  return (
    <PageContainer content="块级拖拽问题">
      <Card title='标签/列表拖拽' >
        <div className="row">
          <DraggableArea
            isList
            tags={tags}
            render={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
            onChange={(tags) => {
              console.log(tags)
              setTags(tags)
            }}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Index;

