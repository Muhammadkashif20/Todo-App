// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
import { useEffect, useState } from 'react'
import { Text, TextInput, View, ActivityIndicator, TouchableOpacity } from 'react-native'

const Index = () => {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [Loading, setLoading] = useState(true);
  const [Edit, setEdit] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (Loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#f3f4f6" }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    )
  }

  const handleAddTodo = () => {
    if (todo.trim() === "") {
      alert("Please Enter a Valid Todo!");
      return;
    }
    setTodos([...todos, todo])
    setTodo("")
  }

  const handleEditTodo = (id) => {
    setEdit(id)
    setTodo(todos[id])
  }

  const handleSaveTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[Edit] = todo;
    setTodos(updatedTodos);
    setEdit(null);
  }

  const handleDelTodo = (item) => {
    const removeTodo = todos.filter((todo)=>todo !== item)
    setTodos(removeTodo)
  }

  return (

    <View style={{ flex:1, padding:22, backgroundColor:"#f3f4f6" }}>

      {/* Header */}
      <Text style={{
        fontSize:34,
        fontFamily:"Arial",
        fontWeight:"600",
        textAlign:"center",
        marginBottom:30,
        color:"#111827",
        // letterSpacing:1
      }}>
        Todo App ✨
      </Text>

      {/* Input Card */}
      <View style={{
        backgroundColor:"#fff",
        borderRadius:18,
        padding:16,
        shadowColor:"#000",
        shadowOpacity:0.08,
        shadowRadius:10,
        elevation:5
      }}>

        <TextInput
          placeholder="Write something to do..."
          value={todo}
          onChangeText={setTodo}
          style={{
            fontSize:16,
            paddingVertical:8,
            color:"#111"
          }}
        />

        <TouchableOpacity
          onPress={handleAddTodo}
          style={{
            marginTop:12,
            backgroundColor:"#6366f1",
            paddingVertical:12,
            borderRadius:10,
            alignItems:"center"
          }}
        >
          <Text style={{color:"#fff", fontWeight:"600"}}>Add Todo</Text>
        </TouchableOpacity>

      </View>

      {/* Todo List */}
      <View style={{ marginTop:28 }}>

        {todos.length === 0 ? (
          <Text style={{textAlign:"center", color:"#6b7280", fontSize:15}}>
            No todos yet. Start adding something 🌱
          </Text>
        ) : (
          todos.map((item, id) => (

            <View
              key={id}
              style={{
                backgroundColor:"#fff",
                padding:18,
                borderRadius:18,
                marginBottom:14,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                shadowColor:"#000",
                shadowOpacity:0.06,
                shadowRadius:8,
                elevation:4
              }}
            >

              {Edit === id ? (
                <TextInput
                  value={todo}
                  onChangeText={setTodo}
                  style={{
                    fontSize:16,
                    flex:1,
                    paddingVertical:4
                  }}
                />
              ) : (
                <Text style={{
                  fontSize:16,
                  color:"#1f2937",
                  flex:1
                }}>
                  {item}
                </Text>
              )}

              <View style={{ flexDirection:"row", gap:10 }}>

                <TouchableOpacity
                  onPress={()=>{
                    if(Edit===id){
                      setEdit(false)
                      handleSaveTodo()
                    }else{
                      handleEditTodo(id)
                    }
                  }}
                  style={{
                    backgroundColor:"#10b981",
                    paddingVertical:6,
                    paddingHorizontal:12,
                    borderRadius:8
                  }}
                >
                  <Text style={{color:"#fff", fontSize:13}}>
                    {Edit===id ? "Save" : "Edit"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={()=>handleDelTodo(item)}
                  style={{
                    backgroundColor:"#ef4444",
                    paddingVertical:6,
                    paddingHorizontal:12,
                    borderRadius:8
                  }}
                >
                  <Text style={{color:"#fff", fontSize:13}}>Delete</Text>
                </TouchableOpacity>

              </View>

            </View>

          ))
        )}

      </View>

    </View>
  )
}

export default Index