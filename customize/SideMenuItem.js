import React, { Component } from 'react';

export class SideMenuItem extends Component
{
	render()
	{
		return
		(
			<ListItem icon>
                <Left>
                    <Icon name="plane" />
                </Left>
                <Body>
                  <Text>{ this.props.item.title }</Text>
                </Body>
                <Right>
                    <Switch value={false} />
                </Right>
            </ListItem>
		)
	}
}
