    
// làm việc với array, các phép duyệt, sắp xếp, tìm kiếm
function arrayData(){
        let colors = ['red', 'green', 'blue']
    // duyệt từng phần tử trong array colors
    colors.forEach(x => console.log(`color is: ${x}`))

    // mảng các đối tượng object

    var famousPerson = [
        {
            id: 1,
            name: 'van long',
            yearsOfBirth: 1999
        },
        {
            id: 2,
            name: 'van minh',
            yearsOfBirth: 1995
        },
        {
            id: 3,
            name: 'quoc vuong',
            yearsOfBirth: 1998
        },{
            id: 4,
            name: 'noname',
            yearsOfBirth: 1990
        }
    ]

    // bth sẽ k in đc object, phải dùng hàm json.stringfy để convert object to string
    console.log(`famous persons are: ${JSON.stringify(famousPerson)}`)

    // thêm đối tượng vào mảng

    // famousPerson.push({
        // id: 5,
        // name: 'vcl',
        // yearsOfBirth: 1969
    // })

    // tạo 1 mảng mới giống hệt famousPerson và thêm 1 object vào
    var famousPerson2 = famousPerson.concat({
        id: 5,
        name: 'vcl',
        yearsOfBirth: 1969
    })

    console.log(`famous person laf: ${JSON.stringify(famousPerson2)}`)

    // sắp xếp dữ liệu, sắp xếp theo năm sinh
    // sắp xếp tăng dần
    famousPerson2.sort((person1, person2) => person1.yearsOfBirth > person2.yearsOfBirth  )
    console.log(`famous person is: ${JSON.stringify(famousPerson2)}`)


    // lọc = filter: tìm kiếm dữ liệu

    let filterPerson = famousPerson.filter(person => person.yearsOfBirth > 1997)

    console.log(`year > 1997: ${JSON.stringify(filterPerson)}`)


}


function objectData(){
    var resolution = {
        width: 1024,
        height: 7220,
        name: 'full HD'

    }
    console.log(`resoluton: ${JSON.stringify(resolution)}`)

    const width = 24
    const height = 17
    var resolution2 = {
        width,
        height,
        name: 'tao lao'
    }
    console.log(`resolution 2: ${JSON.stringify(resolution2)}`)

    let person = {
        name: 'long',
        age: 20,
        email: 'nguyenvanlongt2@gmail.com',
        'tên đày đủ': 'nguyễn văn long',
        cheat(teacher) {
            console.log(`hello ${teacher}`)        
        }
    }


    person.cheat('vinh')
    console.log(`ten day du la: ${person['tên đày đủ']}`)

    // let {name, age} = person
    // console.log(`1. ten la: ${name}, tuoi la: ${age}`)


    // destructing: 
    let {name, age, firstName = ''} = person

    console.log(`1. ten la: ${name}, tuoi la: ${age}, first: ${firstName}`)



    let {name: ten, age: tuoi} = person

    console.log(`3. ten la: ${ten}, tuoi la: ${tuoi}`)


}

objectData()


