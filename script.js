let students = [];
let selectedImage = "";
function addStudent(){
    let s = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        class: document.getElementById('class').value,
        img: selectedImage
    };
    if(!s.id || !s.name){ alert('Vui lòng nhập ID và Họ tên'); return; }
    students.push(s);
    render();
}
function editStudent(i){
    students.splice(i,1);
    render();
}
function deleteStudent(i){
    students.splice(i,1);
    render();
}
function render(){
    let html = '';
    students.forEach((s,i)=>{
        html += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.dob}</td>
                <td>${s.gender}</td>
                <td>${s.class}</td>
                <td><img src="${s.img}"></td>
                <td>
                <button class='btn edit' onclick='editStudent(${i})'><i class="fa-solid fa-pen-to-square"></i></button>
                <button class='btn delete' onclick='deleteStudent(${i})'><i class="fa-solid fa-trash-can"></i></i></i></button>
                </td>              
            </tr>`;
    });
    document.getElementById('list').innerHTML = html;
}
function loadImage(event){
    let reader = new FileReader();
    reader.onload = function(){
        selectedImage = reader.result;
        document.getElementById('preview').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}
window.localStorage.setItem('students',JSON.stringify(students));
render();