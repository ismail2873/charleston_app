import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ReadMoreText = ({ shortText, fullText }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 18 }}>
        {shortText}
        {expanded && fullText}
      </Text>

      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={{ color: 'rgb(31, 31, 244)', marginTop: 5, fontSize: 18 }}>
          {expanded ? ' Show Less' : ' Read More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReadMoreText;