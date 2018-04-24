import React from 'react'
import PropTypes from 'prop-types'
import { CirclePicker } from 'react-color'
import { FormattedMessage } from 'react-intl'
import config from './config/config'
import AvatarViewer from 'SHARED_COMPONENTS/AvatarViewer/AvatarViewer'
import Button from 'SHARED_COMPONENTS/Buttons/Button'
import { AVATAR_SHAPE_SHARED_COMPONENTS, DEFAULT_AVATAR } from './config/utils'
import styles from './AvatarEditor.less'

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export class Arrow extends React.Component {
  render = () => <div
    className={ `${ this.props.left ? styles.leftArrow : styles.rightArrow }` }
    onClick={ this.props.handleClick } />
}

Arrow.propTypes = {
  handleClick: PropTypes.func,
  left: PropTypes.bool,
}

export class ClickableLabel extends React.Component {
  _handlePartClick = () => {
    this.props.handlePartClick(this.props.part)
  }
  render = () =>
    <div
      onClick={ this._handlePartClick }
      className={ `${ styles.label } ${ this.props.selectedPart === this.props.part && styles.labelSelected }` }>
      { this.props.formattedMessage }
    </div>
}

ClickableLabel.propTypes = {
  selectedPart: PropTypes.string,
  part: PropTypes.string,
  handlePartClick: PropTypes.func,
  formattedMessage: PropTypes.element,
}

class AvatarEditor extends React.Component {
  state = {
    selectedPart: 'face',
    avatar: undefined,
    config: config,
    selectedStyle: 0,
  }
  componentWillMount () {
    if (this.props.avatar === undefined) {
      this.setState({ avatar: { ...DEFAULT_AVATAR } })
    } else {
      this.setState({ avatar: this.props.avatar })
    }
  }
  _handleRightArrow (event) {
    event.preventDefault()
    let selectedStyle
    selectedStyle = (this.state.selectedStyle + 1) % this.state.config[this.state.selectedPart].styles.length
    this.setState({
      selectedStyle: selectedStyle,
      avatar: {
        ...this.state.avatar,
        [this.state.selectedPart]: {
          ...this.state.avatar[this.state.selectedPart],
          style: config[this.state.selectedPart].styles[selectedStyle] } },
    })
  }
  _handleLeftArrow (event) {
    event.preventDefault()
    let selectedStyle = (this.state.selectedStyle - 1) % this.state.config[this.state.selectedPart].styles.length
    if (selectedStyle < 0) {
      selectedStyle = this.state.config[this.state.selectedPart].styles.length + selectedStyle
    }
    this.setState({
      selectedStyle: selectedStyle,
      avatar: {
        ...this.state.avatar,
        [this.state.selectedPart]: {
          ...this.state.avatar[this.state.selectedPart],
          style: config[this.state.selectedPart].styles[Math.abs(selectedStyle)] } },
    })
  }
  _handleColorChange = (color) => {
    this.setState({ avatar: {
      ...this.state.avatar,
      [this.state.selectedPart]: { ...this.state.avatar[this.state.selectedPart], color: color.hex } },
    })
  }
  _handlePartClick = (part) => {
    this.setState({ selectedPart: part })
  }
  _handleSubmit = () => {
    if (this.props.avatar === undefined) {
      this.props.create({ ...this.state.avatar, email: this.props.email })
    } else {
      this.props.update({ ...this.state.avatar, email: this.props.email })
    }
  }
  _handleRandom = () => {
    let avatar = {
      eyes: {
        color: config.eyes.colors[getRandom(0, config.eyes.colors.length-1)],
        style: config.eyes.styles[getRandom(0, config.eyes.styles.length-1)] },
      face: {
        color: config.face.colors[getRandom(0, config.face.colors.length-1)],
        style: config.face.styles[getRandom(0, config.face.styles.length-1)] },
      hair: {
        color: config.hair.colors[getRandom(0, config.hair.colors.length-1)],
        style: config.hair.styles[getRandom(0, config.hair.styles.length-1)] },
      mouth: {
        color: config.mouth.colors[getRandom(0, config.mouth.colors.length-1)],
        style: config.mouth.styles[getRandom(0, config.mouth.styles.length-1)] },
      nose: {
        color: config.nose.colors[getRandom(0, config.nose.colors.length-1)],
        style: config.nose.styles[getRandom(0, config.nose.styles.length-1)] },
    }
    this.setState({ avatar })
  }
  render = () => {
    return (
      <div className={ styles.container }>
        <div className={ styles.avatar }>
          <AvatarViewer avatar={ this.state.avatar } />
        </div>
        <div className={ styles.selector }>
          <div className={ styles.textlabel }>
            <FormattedMessage
              id='avatareditor.colorselector.label'
              description='Color Selector'
              defaultMessage='Selectionner une couleur'
            />
          </div>
          <CirclePicker
            colors={ config[this.state.selectedPart].colors }
            color={ this.state.avatar && this.state.avatar[this.state.selectedPart].color }
            onChangeComplete={ this._handleColorChange } />
          <div className={ styles.textlabel }>
            <FormattedMessage
              id='avatareditor.shapeselector.label'
              description='Shape Selector'
              defaultMessage='Selectionner un style'
            />
          </div>
          <div className={ styles.shapeSelector }>
            <Arrow left handleClick={ this._handleLeftArrow.bind(this) } />
            <Arrow handleClick={ this._handleRightArrow.bind(this) } />
          </div>
        </div>
        <div className={ styles.partSelector }>
          { AVATAR_SHAPE_SHARED_COMPONENTS.map((item) => (
            <ClickableLabel
              key={ item.id }
              selectedPart={ this.state.selectedPart }
              part={ item.id }
              handlePartClick={ this._handlePartClick }
              formattedMessage={ item.displayedName }
            />
          )) }
        </div>
        <div className={ styles.formButton }>
          <Button
            buttonType={ 'submit' }
            handleClick={ this._handleSubmit }
            text={ <FormattedMessage
              id='save.button.submit'
              description='Save button'
              defaultMessage='Sauvegarder' /> }
            primary />
          <Button
            buttonType={ 'submit' }
            handleClick={ this._handleRandom }
            text={ <FormattedMessage
              id='save.button.random'
              description='Random Create'
              defaultMessage='Création aléatoire' /> }
            secondary />
        </div>
      </div>
    )
  }
}

AvatarEditor.propTypes = {
  email: PropTypes.string,
  avatar: PropTypes.object,
  create: PropTypes.func,
  update: PropTypes.func,
}

export default AvatarEditor
