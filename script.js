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
    let dob = document.getElementById('dob').value;

    if (calculateAge(dob) < 18) {
        alert("Học sinh chưa đủ 18 tuổi!");
        return;
    }
    students.push(s);
    alert("Thêm học viên thành công!");
    render();
}
function editStudent(i){
    students.splice(i,1);
    alert("Cập nhật học viên thành công!");
    render();
}
function deleteStudent(i){
    const ok = confirm("Bạn có chắc chắn muốn xoá học viên này không?");
    if (!ok) return;
    students.splice(i,1);
    alert("Xoá học viên thành công!");
    render();
}
function render(){
    let html = '';
    students.forEach((s,i)=>{
        html += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${formatDate(s.dob)}</td>
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
function formatDate(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return "";
    return `${day}-${month}-${year}`;
}

function calculateAge(dob) {
    const [year, month, day] = dob.split("-").map(Number);
    const today = new Date();
    let age = today.getFullYear() - year;

    if (
        today.getMonth() + 1 < month ||
        (today.getMonth() + 1 === month && today.getDate() < day)
    ) {
        age--;
    }
    return age;
}

function loadImage(event){
    let reader = new FileReader();
    reader.onload = function(){
        selectedImage = reader.result;
        document.getElementById('preview').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}
window.localStorage.setItem('students' , JSON.stringify(students));
render();