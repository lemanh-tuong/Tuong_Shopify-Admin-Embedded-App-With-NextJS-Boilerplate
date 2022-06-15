import { ReactNode, useEffect, useRef, useState } from 'react';
import { LineAwesome, useTheme, View } from 'wiloke-react-core';

interface CarouselProps<T> {
  slideWidth: number;
  slideCount: number;
  interval?: number;
  data: T[];
  renderItem: (params: T, index: number) => ReactNode;
  animationDuration?: number;
  space?: number;
  keyExtractor?: (params: T, index: number) => string | number;
}

export const Carousel = <T,>({
  slideWidth,
  slideCount,
  interval = 10000,
  animationDuration = 300,
  space = 10,
  keyExtractor = (_, index) => index,
  data,
  renderItem,
}: CarouselProps<T>) => {
  const { colors } = useTheme();
  // Props
  const DEFAULT_SLIDE_COUNT = slideCount;
  const SLIDE_WIDTH = slideWidth;
  const SPACE = space;
  const ANIMATION_DURATION = animationDuration;
  const INTERVAL = interval;

  const [animating, setAnimating] = useState(false);
  const [index, setIndex] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(DEFAULT_SLIDE_COUNT);
  const carouselEl = useRef<HTMLDivElement | null>(null);
  const slidesEl = useRef<HTMLDivElement | null>(null);
  const nextSlideTimeout = useRef<number | undefined>(undefined);

  const NUM_OF_ITEMS = numberOfItems;
  const MAX_LENGTH = Math.ceil(data.length / NUM_OF_ITEMS - 1);
  const ITEM_WIDTH = (100 - SPACE) / NUM_OF_ITEMS;
  const REDUNANT_SLIDE = data.length - MAX_LENGTH * NUM_OF_ITEMS;
  const MAX_X = MAX_LENGTH * NUM_OF_ITEMS * ITEM_WIDTH - SPACE - (NUM_OF_ITEMS - REDUNANT_SLIDE) * ITEM_WIDTH;
  const CURRENT_TRANSFORM_WITH_INDEX = -Math.max(0, index !== MAX_LENGTH ? index * ITEM_WIDTH * NUM_OF_ITEMS : MAX_X);

  const _renderSlide = (item: T, index: number) => {
    return (
      <View css={{ flexShrink: 0, flexBasis: `${ITEM_WIDTH}%` }} key={keyExtractor(item, index)}>
        {renderItem(item, index)}
      </View>
    );
  };

  const _handleClearInterval = () => {
    clearTimeout(nextSlideTimeout.current);
  };

  const _handleInterval = () => {
    _handleClearInterval();
    nextSlideTimeout.current = window.setTimeout(() => {
      setIndex(index => {
        if (index >= MAX_LENGTH) {
          return 0;
        }
        return index + 1;
      });
      setAnimating(true);
    }, INTERVAL);
  };

  const _handleResize = () => {
    if (carouselEl.current) {
      const containerWidth = (carouselEl.current.clientWidth * (100 - SPACE)) / 100;
      const columnsPerRow = Math.max(1, Math.floor(containerWidth / SLIDE_WIDTH));
      setNumberOfItems(DEFAULT_SLIDE_COUNT ? Math.min(DEFAULT_SLIDE_COUNT, columnsPerRow) : columnsPerRow);
    }
  };

  useEffect(() => {
    let timeout: number | undefined;
    if (animating) {
      timeout = window.setTimeout(() => {
        setAnimating(false);
        clearTimeout(timeout);
      }, ANIMATION_DURATION);
    }
    return () => clearTimeout(timeout);
  }, [animating, ANIMATION_DURATION]);

  useEffect(() => {
    _handleInterval();
    return () => {
      _handleClearInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    _handleResize();
    window.addEventListener('resize', _handleResize);
    return () => {
      window.removeEventListener('resize', _handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View css={{ position: 'relative' }}>
      <View css={{ overflow: 'hidden' }} ref={carouselEl}>
        <View
          ref={slidesEl}
          css={{ display: 'flex', flexWrap: 'nowrap', willChange: 'transform' }}
          style={{
            transition: animating ? `${ANIMATION_DURATION}ms transform` : undefined,
            transform: `translateX(${CURRENT_TRANSFORM_WITH_INDEX}%)`,
          }}
        >
          {data.map(_renderSlide)}
        </View>
      </View>

      {index < MAX_LENGTH && (
        <View
          css={{
            position: 'absolute',
            right: '0px',
            top: '50%',
            transform: 'translate(50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: colors.light,
            cursor: 'pointer',
          }}
          onClick={() => {
            setIndex(index => {
              if (index >= MAX_LENGTH) {
                return 0;
              }
              return index + 1;
            });
            setAnimating(true);
          }}
        >
          <LineAwesome size={20} name="angle-right" />
        </View>
      )}

      {index > 0 && (
        <View
          css={{
            position: 'absolute',
            left: '0px',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: colors.light,
            cursor: 'pointer',
          }}
          onClick={() => {
            setIndex(index => {
              if (index === 0) {
                return MAX_LENGTH;
              }
              return index - 1;
            });
            setAnimating(true);
          }}
        >
          <LineAwesome size={20} name="angle-left" />
        </View>
      )}
    </View>
  );
};
