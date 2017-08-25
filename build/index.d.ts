/// <reference types="react" />
import * as React from 'react';
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
export declare class VirtualScroll extends React.PureComponent<IProps, IState> {
    static defaultProps: Partial<IProps>;
    refs: {
        [key: string]: (Element);
        container: (HTMLElement);
        wrapper: (HTMLElement);
    };
    private container;
    private wrapper;
    private step;
    constructor(props: IProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private onScrollListener(event);
    private setHeight();
    private calculateHiddenIndex();
    private calculateHiddenHeight(lastHiddenIndex);
}
