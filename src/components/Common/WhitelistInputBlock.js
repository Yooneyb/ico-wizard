import React from 'react'
import '../../assets/stylesheets/application.css';
import { InputField } from './InputField'
import { TEXT_FIELDS, defaultState } from '../../utils/constants'
import { WhitelistItem } from './WhitelistItem'
import { getOldState } from '../../utils/utils'
const { ADDRESS, MIN, MAX } = TEXT_FIELDS

export class WhitelistInputBlock extends React.Component {

    constructor(props) {
        super(props);
        let oldState = getOldState(props, defaultState)
        this.state = Object.assign({}, oldState)
    }

    addWhitelistItem = (addr, min, max) => {
        if (!addr || !min || !max) return;

        let isAdded = false;
        for (let i = 0; i < this.state.crowdsale[this.props.num].whitelist.length; i++) {
            let addedAddr = this.state.crowdsale[this.props.num].whitelist[i].addr;
            if (addedAddr === addr) {
                isAdded = true;
                break;
            }
        }

        if (isAdded) return;

        let state = this.state
        let num = state.crowdsale[this.props.num].whiteListElements.length;
        state.crowdsale[this.props.num].whiteListElements.push(<WhitelistItem 
            key={num.toString()}
            addr={addr}
            min={min}
            max={max}></WhitelistItem>);
        state.crowdsale[this.props.num].whitelist.push({
            addr,
            min,
            max
        });
        this.setState(state);
    }

    render() {
        let { crowdsale } = this.state
        const { num } = this.props
        return (<div className="white-list-container"><div className="white-list-input-container">
              <InputField 
                side='white-list-input-property-left' 
                type='text' 
                title={ADDRESS} 
                value={crowdsale[num].whiteListInput.addr} 
                onChange={(e) => this.props.onChange(e, 'crowdsale', this.props.num, 'whitelist_addr')}
                description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veni.`}
              />
              <InputField 
                side='white-list-input-property-middle' 
                type='number' 
                title={MIN} 
                value={crowdsale[num].whiteListInput.min} 
                onChange={(e) => this.props.onChange(e, 'crowdsale', this.props.num, 'whitelist_min')}
                description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veni.`}
              />
              <InputField 
                side='white-list-input-property-right'
                type='number' 
                title={MAX} 
                value={crowdsale[num].whiteListInput.max} 
                onChange={(e) => this.props.onChange(e, 'crowdsale', this.props.num, 'whitelist_max')}
                description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veni.`}
              />
              <div className="plus-button-container"><div onClick={(e) => this.addWhitelistItem(crowdsale[num].whiteListInput.addr, crowdsale[num].whiteListInput.min, crowdsale[num].whiteListInput.max)} className="button button_fill button_fill_plus"></div></div>
            </div>
            {crowdsale[num].whiteListElements}
            </div>)
    }
}