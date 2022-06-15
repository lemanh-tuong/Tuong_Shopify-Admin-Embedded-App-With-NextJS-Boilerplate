import EmptyComponent from 'antd/lib/empty';
import React, { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'wiloke-react-core';

export interface AsyncComponentProps {
  status: Status;
  Idle?: ReactNode;
  Request?: ReactNode;
  Success: ReactNode;
  Failure?: ReactNode;
  Empty?: ReactNode;
  isEmpty?: boolean;
}

const AsyncComponent: FC<AsyncComponentProps> = ({
  status,
  Success,
  Failure = <EmptyComponent />,
  Idle = '',
  Request = <ActivityIndicator />,
  Empty = <EmptyComponent />,
  isEmpty = false,
}) => {
  const _renderMapping: Record<Status, ReactNode> = {
    idle: isEmpty ? Empty : Idle,
    loading: Request,
    success: isEmpty ? Empty : Success,
    failure: Failure,
  };

  return <>{_renderMapping[status]}</>;
};

export { AsyncComponent };
