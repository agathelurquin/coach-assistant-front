import { Badge, Space } from "antd";

function CountBadge(props) {
  const number = props.number;
  return (
    <Space size="small">
      <Badge count={number} showZero color="#0019fe">
        <a href={props.href} className="anchor">
          <button className="tag-button">{props.message}</button>
        </a>
      </Badge>
    </Space>
  );
}

export default CountBadge;
