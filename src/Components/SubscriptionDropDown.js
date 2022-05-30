import React, {useState} from 'react';
import DropDown from 'react-native-paper-dropdown';
import subscription from "../data/Subscription"

const SubscriptionDropDown = (props) => {
  const [subscriptionValue, setSubscriptionValue] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);

  const setValues = (value) => {
    setSubscriptionValue(value);
    props.setValue(value);
  }

  return (
    <DropDown
      label='Suscripción*'
      mode={'outlined'}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={subscriptionValue}
      setValue={newSubscription => setValues(newSubscription)}
      list={Object.values(subscription)}
    />
  );
}

export default SubscriptionDropDown;
