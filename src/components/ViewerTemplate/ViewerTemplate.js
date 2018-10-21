import React from 'react';
import styles from './ViewerTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 템플릿 컴포넌트..적당한 위치에 렌더링해주는 역할
const ViewerTemplate = ({ viewer, spaceNavigator }) => {
    return (
        <div className={cx('viewer-template')}>
            <header>
                Astronomy Picture of the Day
            </header>
            <div className={cx('viewer-wrapper')}>
                {viewer}
                <div className={cx('space-navigator-wrapper')}>
                    {spaceNavigator}
                </div>
            </div>
        </div>
    );
};

export default ViewerTemplate;