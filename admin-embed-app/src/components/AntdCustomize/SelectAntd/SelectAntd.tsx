import Select, { RefSelectProps, SelectProps } from 'antd/lib/select';
import { FC, ReactNode, useRef } from 'react';
import { v4 } from 'uuid';
import { useStyleSheet, useTheme } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as css from './styles';

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectAntdProps extends SelectProps<any> {
  data?: Option[];
  renderOption?: (item: Option, index: number) => ReactNode;
  blurOnChange?: boolean;
  optionMultipleLines?: boolean;
}

export const SelectAntd: FC<SelectAntdProps> = ({
  className = '',
  data = [],
  renderOption,
  onChange,
  blurOnChange = false,
  optionMultipleLines = false,
  ...rest
}) => {
  const { colors } = useTheme();
  const { styles } = useStyleSheet(colors);
  const ref = useRef<RefSelectProps>(null);

  const _renderOption = () => {
    return data.map((item, index) => {
      return (
        <Select.Option key={v4()} value={item.value}>
          {renderOption ? renderOption(item, index) : item.label}
        </Select.Option>
      );
    });
  };

  const _handleChange: SelectProps<any>['onChange'] = (value, option) => {
    if (Array.isArray(value)) {
      onChange?.(
        value.filter((item: any) => !!item),
        option,
      );
    } else {
      onChange?.(value, option);
    }
    if (blurOnChange) {
      ref.current?.blur();
    }
  };

  if (data.length) {
    return (
      <Select
        {...rest}
        tokenSeparators={[',']}
        onChange={_handleChange}
        ref={ref}
        virtual={!optionMultipleLines || rest.virtual}
        className={classNames(
          styles(css.container),
          optionMultipleLines ? styles(css.optionMultipleLines) : '',
          rest.mode ? styles(css.containerWithTag) : '',
          className,
        )}
      >
        {_renderOption()}
      </Select>
    );
  }

  return (
    <Select
      {...rest}
      tokenSeparators={[',', '&#13', '&#10']}
      onChange={_handleChange}
      ref={ref}
      className={classNames(
        styles(css.container),
        optionMultipleLines ? styles(css.optionMultipleLines) : '',
        rest.mode ? styles(css.containerWithTag) : '',
        className,
      )}
    />
  );
};
