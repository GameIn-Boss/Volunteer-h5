/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './filter.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';

export const TYPES = [i18next.t('最新发布'), i18next.t('距离最近'), i18next.t('热门活动')];
export const TYPES_VALUE = ['time', 'distance', 'recommend'];

class NewsFilter extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    const CATEGORY_OPTIONS = [
      '全部',
      '志联动态',
      '团体动态',
      '通知公告',
      '媒体报道'
    ];
    this.filterConfig = {
      types: TYPES,
      categories: CATEGORY_OPTIONS,
      objects: window.serviceTarget,
    };

    this.state = {
      showOptionsType: '',
      selectedOption: {
        types: this.filterConfig.types[props.type] || '',
        categories: window.serviceCategory[props.category] || '',
        objects: window.serviceTarget[props.target] || '',
      },
    };

  }

  componentWillMount() {
    console.log( this.filterConfig)

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  handleFilterHeaderClick(optionType) {
    return () => this.setState({
      ...this.state,
      showOptionsType: this.state.showOptionsType === optionType ? '' : optionType,
    }, () => {
      if (this.state.showOptionsType) {
        this.props.onFilterShow();
      } else {
        this.props.onFilterHide();
      }
    });
  }

  handleOptionSelected(optionType, option) {
    return () => {
      this.setState({
        ...this.state,
        showOptionsType: '',
        selectedOption: {
          ...this.state.selectedOption,
          [optionType]: option === this.state.selectedOption[optionType] ? '' : option,
        },
      }, () => {
        const { types, categories, objects } = this.state.selectedOption;
        this.props.onFilterChange({
          category: categories,
        });
        this.props.onFilterHide();
      });
    };
  }

  renderFilterOptionis(optionType) {
    const options = this.filterConfig[optionType];

    if (!options) {
      return null;
    }

    const selectedOption = this.state.selectedOption[optionType];

    return (
      <ul className="filter-optioins">
        {
          options.map(
            (option, idx) =>
              <li key={idx} className={classnames({ selected: selectedOption === option })}>
                <a onClick={this.handleOptionSelected(optionType, option)}>{option}</a>
                <div className="line1px" />
              </li>)
        }
      </ul>
    );
  }

  render() {
    const { t } = this.props;
    const { showOptionsType, selectedOption } = this.state;
    const selectedCategory = selectedOption.categories || t('公告类型');

    return (
      <div className="component-project-filter">
        <div className="filter-header">
          {/** line1px-top */}
          <div className="line1px line1px-top" />
          <div className="filter-actions">
            {/* <a className={classnames({ opened: showOptionsType === 'types' })} onClick={this.handleFilterHeaderClick('types')}>
              <span>{selectedType}</span>
            </a>
            <div className="line1px-v" /> */}
            {orgCode === "LYqaQWldnj" ? 

            <a className={classnames({ opened: showOptionsType === 'categories' })} onClick={this.handleFilterHeaderClick('categories')}>
              <span>公告类型</span>
            </a>
            :<a className={classnames({ opened: showOptionsType === 'categories' })} onClick={this.handleFilterHeaderClick('categories')}>
            <span>{selectedCategory}</span>
          </a>}
            <div className="line1px-v" />
            {/* {orgCode === "yJrb2kKdWL" ? null :(
            <a className={classnames({ opened: showOptionsType === 'objects' })} onClick={this.handleFilterHeaderClick('objects')}>
              <span>{selectedObject}</span>
            </a> 
            )} */}
          </div>
          <div className="line1px line1px-bottom" />
        </div>
        {this.renderFilterOptionis(showOptionsType)}
        {showOptionsType ? <div className="filter-mask" /> : null}
      </div>
    );
  }
}

NewsFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onFilterShow: PropTypes.func,
  onFilterHide: PropTypes.func,
  type: PropTypes.number,
  category: PropTypes.number,
  target: PropTypes.number,
};

export default translate('translations')(NewsFilter);
