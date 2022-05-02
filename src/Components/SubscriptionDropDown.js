import React, {useState} from 'react';
import DropDown from 'react-native-paper-dropdown';

const subscriptionData = require('../data/subscription.json');

const SubscriptionDropDown = (props) => {
  const [subscription, setSubscription] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  const setValues = (value) => {
    setSubscription(value);
    props.setValue(value);
  }

  return (
    <DropDown
      label='Suscripción*'
      mode={'outlined'}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={subscription}
      setValue={newSubscription => setValues(newSubscription)}
      list={subscriptionData}
    />
  );
}

export default SubscriptionDropDown;
