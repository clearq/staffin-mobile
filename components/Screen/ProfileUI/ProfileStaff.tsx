// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
// import React, { useState } from 'react'
// import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
// import { colors } from '@/constants/colors'
// import { CardBody, CardFooter, CardHeader } from '@/components/UI/ProfileCard'
// import { User } from '@/api/user'
// import { Post } from '@/api/community'
// import { Link } from 'expo-router'
// import { globalStyles } from '@/constants/globalStyles'

// type profileProps = {
//   user: User
//   posts?:Post[]
// }


// const ProfileStaff = ({user, posts}:profileProps) => {

  
//   return (
//     <View style={{flexDirection:'column', gap:16,}}>

//       {/* Card: User Info */}
//       <View style={[styles.cardContainer]}>

//         <CardHeader 
//           title='Information'
//           isCurrentUser={true}
//         />
//         <CardBody>
//           <View style={[styles.infoItem]}>
//             <MaterialCommunityIcons name='account' size={16} color={colors.gray} />
//             <Text style={[styles.itemTitle]}>Full Name:</Text>
//             <Text style={[styles.item]}>
//               { user 
//                 ? user.firstName + ' ' + user.lastName 
//                 : ''
//               }
//             </Text>
//           </View>
//           <View style={[styles.infoItem]}>
//             <MaterialCommunityIcons name='map-marker' size={16} color={colors.gray} />
//             <Text style={[styles.itemTitle]}>Location:</Text>
//             <Text style={[styles.item]}>
//               { user 
//                 ? user.city 
//                 : ''
//               }
//             </Text>
//           </View>
//           <View style={[styles.infoItem]}>
//             <MaterialCommunityIcons name='email' size={16} color={colors.gray} />
//             <Text style={[styles.itemTitle]}>Email:</Text>
//             <Text style={[styles.item]}>{user.email}</Text>
//           </View>
//         </CardBody>
//       </View>
      

//       {/* Card: About */}
//       <View style={[styles.cardContainer]}>

//         <CardHeader 
//           title='About'
//           isCurrentUser={true}
//         />
//         <CardBody>
//           <Text style={[styles.item]}>
//             {user 
//               ? user.about 
//               : ''
//             }
//           </Text>
//         </CardBody>
//       </View>


//       {/* Card: Activity */}
//       <View style={[styles.cardContainer]}>
//         <CardHeader 
//           title='Activity'
//           isCurrentUser={true}
//         />
//         <CardBody>
//           <View style={{flexDirection:'column', gap:16,}}>
//             {posts && posts
//               .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by newest
//               .slice(0, 2) // Take the latest 2 posts
//               .map(post => (
//                 <View key={post.postId} style={{flexDirection:'row', gap:8}}>

//                   <View style={[{flex:1, width:'80%', flexDirection:'column'}]}>
//                     <Text 
//                       numberOfLines={2} 
//                       ellipsizeMode="tail"
//                       style={[styles.item, {lineHeight:20}]}
//                     >
//                       {post.content}
//                     </Text>
                    
//                     <Link href={'/#'}>
//                       <Text style={[styles.linkText, styles.item]}>Read more...</Text>
//                     </Link>
//                   </View>

//                   <View>
//                     <Image source={{uri:post?.image}} style={{width:64, height:64,}} />
//                   </View>

//                 </View>
//             ))}
//           </View>
//         </CardBody>

//         <CardFooter
//           text='See all activities'
//           showIcon={true}
//           icon='arrow-right-circle-outline'
//         />
//       </View>


//       {/* Card:  Experience*/}
//       <View style={[styles.cardContainer]}>
//         <CardHeader 
//           title='Experience'
//           isCurrentUser={true}
//         />
//         <CardBody>
//           <View style={[{flexDirection:'column', gap:8}]}>
//             {user.experience && user.experience.map(exp => (
//               <View key={exp.id}>
//                 <Text style={[globalStyles.subTitleText]}>
//                   {exp.position}                 
//                 </Text>

//                 <Text style={[styles.item]}>
//                   {exp.companyName}
//                 </Text>

//                 <Text style={[styles.item, {color:colors.gray}]}>
//                   {exp.startDate} - {exp.endDate ? exp.endDate : 'Ongoing'}
//                 </Text>
                
//                 <Text style={[styles.item, {color:colors.gray}]}>
//                   {exp.location}
//                 </Text>

//                 <Text style={[styles.item]}>
//                   {exp.description}
//                 </Text>

//                 <View style={[styles.divider, {marginVertical:8}]}/>
//               </View>
//             ))}
//           </View>
//         </CardBody>

//       </View>


//       {/* Card:  Educations*/}
//       <View style={[styles.cardContainer]}>
//         <CardHeader 
//           title='Educations'
//           isCurrentUser={true}
//         />
//         <CardBody>
//           <View style={[{flexDirection:'column', gap:8}]}>
//             {user.educations && user.educations.map(edu => [
//               <View key={edu.id}>
//                 <Text style={[globalStyles.subTitleText]}>
//                   {edu.name}                 
//                 </Text>

//                 <Text style={[styles.item]}>
//                   {edu.institution}
//                 </Text>

//                 <Text style={[styles.item, {color:colors.gray}]}>
//                   {edu.startDate} - {edu.endDate ? edu.endDate : 'Ongoing'}
//                 </Text>

//                 <View style={[styles.divider, {marginVertical:8}]}/>
//               </View>
//             ])}
//           </View>
//         </CardBody>
//       </View>


//       {/* Card:  Skills*/}
//       <View style={[styles.cardContainer]}>
//         <CardHeader 
//           title='Skills'
//           isCurrentUser={true}
//         />
//         <CardBody>
//           <View style={{flexDirection:'row', flexWrap:'wrap', gap:8}}>
//             {user.skills && user.skills.map(skill => (
//               <View key={skill.id} style={{padding:8, backgroundColor:colors.primary, borderRadius:8}}>
//                 <Text style={[styles.item, {color:colors.white}]}>
//                   {skill.name}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </CardBody>
//       </View>

//       {/* Card:  Languages*/}
//       <View style={[styles.cardContainer]}>
//         <CardHeader 
//           title='Languages'
//           isCurrentUser={true}
//         />
//         <CardBody>
//         <View style={[{flexDirection:'column', gap:8}]}>
//         {user.languages && user.languages.length > 0 ? (
//           user.languages
//             .slice()  // Create a shallow copy of the array
//             .sort((a, b) => b.rating - a.rating)  // Sort the copied array
//             .map((lang) => (
//               <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Text>{lang.name}</Text>

//                 <View style={{ flexDirection: 'row' }}>
//                   {[...Array(5)].map((_, index) => (
//                     <MaterialCommunityIcons
//                       key={index}
//                       name={index < lang.rating ? 'star' : 'star-outline'}
//                       size={24}
//                       color={index < lang.rating ? colors.secondary : colors.gray}
//                     />
//                   ))}
//                 </View>
//               </View>
//             ))
//         ) : (
//           <Text>No languages available</Text> // Message when there are no languages
//         )}
//         </View>
//         </CardBody>
        
//       </View>

//     </View>
//   )
// }

// export default ProfileStaff


// const styles = StyleSheet.create({
//   cardContainer:{
//     width:'100%',
//     flexDirection:'column',
//     backgroundColor:colors.white,
//     padding:16,
//     gap:16,
//   },
//   cardHeader:{
//     flexDirection:'row',
//     justifyContent:'space-between',
//   },
//   cardBody:{
//     flexDirection:'column',
//     gap:4,
//   },
//   cardFooter:{
//     paddingHorizontal:16,
//   },
//   cardTitle:{
//     fontFamily:'Inter-SemiBold',
//     fontSize:20,
//   },
//   infoItem:{
//     flexDirection:'row',
//     gap:8,
//   },
//   itemTitle:{
//     fontFamily:'Inter-SemiBold',
//     fontSize:14,
//   },
//   item:{
//     fontFamily:'Inter-Regular',
//     fontSize:14,
//   },
//   linkText:{
//     textDecorationLine:'underline', 
//     textDecorationColor:colors.primary, 
//     color:colors.primary
//   },
//   divider:{
//     borderColor:colors.tintColor,
//     borderWidth: 0.5,
//   },
// })

