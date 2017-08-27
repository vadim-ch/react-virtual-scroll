import * as React from 'react';
import * as utils from './utils';

export interface IProps {
  list: Array<JSX.Element>;
  bufferSize?: number;
}

export interface IState {
  renderIndex: number;
  rowSize: number;
  heightContainer: number;
  hiddenHeight: number;
}

export class VirtualScroll extends React.PureComponent<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    bufferSize: 20
  };

  public refs: {
    [key: string]: (Element);
    container: (HTMLElement);
    wrapper: (HTMLElement);
  };

  private container: HTMLElement;
  private wrapper: HTMLElement;
  private step: number;
  constructor(props: IProps) {
    super(props);
    const { list } = this.props;

    this.state = {
      renderIndex: 0,
      heightContainer: 0,
      rowSize: 0,
      hiddenHeight: 0
    };
    this.step = this.props.bufferSize / 3;
    this.onScrollListener = utils.debounce(this.onScrollListener.bind(this), 50);
  }

  public componentDidMount(): void {
    this.container.addEventListener('scroll', this.onScrollListener);
    this.setHeight();
    window.onresize = event => {
      this.setHeight();
    };
  }

  public componentWillUnmount(): void {
    window.onresize = () => {/* */};
    this.container.removeEventListener('scroll', this.onScrollListener);
  }

  public render(): JSX.Element {
    const { list, bufferSize } = this.props;
    const { renderIndex, rowSize, hiddenHeight } = this.state;
    const renderList = list.slice(renderIndex, bufferSize + renderIndex);
    const heightWrapper = ((list.length - renderList.length) * rowSize) - hiddenHeight;
    const style = {
      paddingBottom: `${heightWrapper}px`,
      paddingTop: `${hiddenHeight}px`
    };
    return (
        <div ref={container => this.container = container}>
          {!rowSize ? list[0] :
              <div style={style} ref={wrapper => this.wrapper = wrapper}>
                {renderList}
              </div>}
        </div>
    );
  }

  private onScrollListener(event: any): void {
    const { rowSize } = this.state;
    const target = event.target;
    const lastHiddenIndex = Math.floor(target.scrollTop / rowSize);
    const hiddenHeight = rowSize * lastHiddenIndex;
    // const lastHiddenIndex = this.calculateHiddenIndex();
    // const hiddenHeight = this.calculateHiddenHeight(lastHiddenIndex);

    this.setState({
      hiddenHeight
    });

    this.setState({
      renderIndex: lastHiddenIndex
    });
  }

  private setHeight(): void {
    const clientRect = this.container.getBoundingClientRect();
    this.setState({
      rowSize: this.container.clientHeight
    });
    this.container.setAttribute('style',
        `position: fixed; left: ${clientRect.left}px; top: ${clientRect.top}px; bottom: 0; right: 0`);
    this.setState({
      heightContainer: this.container.clientHeight
    });
    this.container.setAttribute('style', `height: ${this.container.clientHeight}px`);
  }

  private calculateHiddenIndex(): number {
    const childrenList = Array.from(this.wrapper.children);
    return childrenList.reduce((result, item, i) => {
      const containerTop = this.container.getBoundingClientRect().top;
      const itemRect = item.getBoundingClientRect();
      const itemBottom = itemRect.top + itemRect.height;
      if (itemBottom < containerTop) {
        result = i;
      }
      return result;
    }, 0);
  }

  private calculateHiddenHeight(lastHiddenIndex: number): number {
    const childrenList = Array.from(this.wrapper.children);
    const hiddenChildrenList = childrenList.slice(0, lastHiddenIndex);
    return hiddenChildrenList.reduce((result, item) => {
      result = result + item.clientHeight;
      return result;
    }, 0);
  }
}
