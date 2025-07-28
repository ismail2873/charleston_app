import {StyleSheet, Text, View, Image} from 'react-native';
import {ImageBackground} from 'react-native';
import {useState} from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import restuarant from './restaurant.json';
import blog_posts from './JsonFiles/blog_posts.json';

const BlogScreen = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleText = id => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [isVisible, setIsVisible] = useState(false);
  const menuItems = [
    'Charleston Publishing',
    '677 King St',
    'Charleston SC 29403',
    'https://charlestonpublishing.com/',
  ];

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleContact = label => {
    console.log('Selected:', label);
    setIsVisible(false);
  };
  console.log(restuarant);

  return (
    <ScrollView>
      {/* <View>
<View style={{paddingHorizontal:20,paddingTop:20, justifyContent:'center',alignItems:'center'}}>
   <Image source={{ uri: 'asset:/images/logo_dark.png' }}
                 style={{ width:'100%', height: 60 }} />
</View>
      </View> */}

      <View>
        {blog_posts.map((item, index) => {
          return (
            <View
              key={item.id || index}
              style={{
                margin: 20,
                marginTop: 10,
                borderColor: '#c8c5c5ff',
                borderWidth: 2,
                borderRadius: 22,
                backgroundColor: '#ffffffff',
              }}>
              <View style={{flex: 1, width: '100%', height: '300'}}>
                <ImageBackground
                  source={{
                    uri:
                      'https://charlestonrestaurantguide.com/assets/backend/media/blog_uploads/' +
                      item.image,
                  }}
                  style={styles.backgroundimage}
                  resizeMode="cover">
                  <View style={styles.overlayimage}>
                    {/* <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                   <Text style={{ color: '#333', fontSize: 18, fontWeight: '500', backgroundColor: 'rgb(192, 193, 195)', padding: 6, borderRadius: 20 }}>Read More</Text>
                 </TouchableOpacity> */}
                  </View>
                </ImageBackground>
              </View>
              <Text
                style={{
                  paddingHorizontal: 10,
                  color: 'rgb(98, 97, 97)',
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {item.author} {item.updated_at}
              </Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 22,
                  fontWeight: '500',
                  marginVertical: 10,
                }}>
                {item.title}
              </Text>
              <Text
                style={{paddingHorizontal: 10, fontSize: 16}}
                numberOfLines={expandedItems[item.id] ? undefined : 2}>
                {item.content}
              </Text>
              <TouchableOpacity onPress={() => toggleText(item.id)}>
                <Text
                  style={{color: 'blue', marginTop: 5, paddingHorizontal: 10}}>
                  {expandedItems[item.id] ? 'Show less' : 'Show more'}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: '#999',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginTop: 20,
                  borderTopColor: 'lightgrey',
                  borderTopWidth: 1,
                  padding: 20,
                }}>
                {item.author}
              </Text>
            </View>
          );
        })}
      </View>

      {blog_posts.map((item, index) => {
        return (
          <View key={item.id || index} style={{padding: 20}}>
            <View
              style={{flexDirection: 'row', width: '100%', marginVertical: 20}}>
              <View style={{width: '30%'}}>
                <Image
                  source={{
                    uri:
                      'https://charlestonrestaurantguide.com/assets/backend/media/blog_uploads/' +
                      item.image,
                  }}
                  style={{width: '100', height: '140'}}
                />
              </View>
              <View style={{width: '70%'}}>
                <Text style={{fontWeight: 'bold', color: 'rgb(109, 106, 106)'}}>
                  {item.updated_at}
                </Text>
                <Text style={{fontSize: 18}}>{item.title}</Text>
              </View>
            </View>
          </View>
        );
      })}

      <View style={{padding: 20}}>
        <View style={styles.container2}>
          <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
            <Text style={styles.buttonText}>Contact</Text>
            <Image
              source={{uri: 'asset:/images/dropdown.png'}}
              style={{width: 15, height: 15}}
            />
          </TouchableOpacity>

          {isVisible &&
            menuItems.map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => handleContact(item)}
                style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#333',
              borderRightColor: '#333',
              borderRightWidth: 1,
              paddingRight: 10,
            }}>
            About
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: '#333',
              borderRightColor: '#333',
              borderRightWidth: 1,
              paddingRight: 10,
            }}>
            Terms and Conditions
          </Text>
          <Text style={{fontSize: 18, color: '#333'}}>Privacy policy</Text>
          <Text style={{fontSize: 18, color: '#333'}}>FAQ</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  overlayimage: {
    // backgroundColor: 'rgba(32, 31, 31, 0.5)',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
    paddingVertical: 30,
  },
  backgroundimage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
    color: 'rgb(107, 107, 107)',
  },
});
