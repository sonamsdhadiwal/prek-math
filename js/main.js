const emplist = $('#employee-list');
const add_emp = $('#add-employee');


const x = document.querySelector('div[id=showalert]');
const z = document.querySelector('div[id=showalert2]');
const y = document.querySelector('div[id=showalert3]');
//const edit = $('#update');

const edit = document.getElementById('update');

// $(document).ready(()=>{
// 	db.collection('employee').get().then((snapshot) =>{
// 		snapshot.docs.forEach(doc => {
// 		   //console.log(doc.data());
// 		   fetchAllemployees(doc);
// 		});
// 	});
// });
function fetchAllemployees(doc) {
    emplist.append(`<tr id="${doc.id}">
					 <td>${doc.data().fullname}</td>
					 <td>${doc.data().age}</td>
					 <td>${doc.data().address}</td>
					 <td>${doc.data().email}</td>
					 <td><a href="javascript:void(0)" class="edit" id="${doc.id}">Edit</a> | <a href="javascript:void(0)" class="del" id="${doc.id}">delete</a></td>
	
	             </tr>`);

    $('.del').click((e) => {
        e.stopImmediatePropagation();
        z.style.display = 'none';
        y.style.display = 'none';
        x.style.display = 'block';
        var id = e.target.id;
        db.collection('employee').doc(id).delete();

	    $('#fullname').val('');
	    $('#age').val('');
	    $('#address').val('');
	    $('#email').val('');


        // console.log(id);
        // console.log(e);
    });
    $('.edit').click((e) => {
        e.stopImmediatePropagation();
        z.style.display = 'none';
        y.style.display = 'none';
        edit.style.display = 'block';
        var id = e.target.id;
        db.collection('employee').doc(id).get().then(doc => {
            $('#fullname').val(doc.data().fullname);
            $('#age').val(doc.data().age);
            $('#address').val(doc.data().address);
            $('#email').val(doc.data().email);
            $('#id_edit').val(doc.id);

            //edit.style.display = "block";
            // console.log(doc);
        });
        // console.log(id);
        // console.log(e);
    });
}

// $('#update').on('click', () => {
// 	    z.style.display = 'none';
//         x.style.display = 'none';
//         y.style.display = 'block';
//     var id = $('#id_edit').val();
//     db.collection('employee').doc(id).set({
//         fullname: $('#fullname').val(),
//         age: $('#age').val(),
//         address: $('#address').val(),
//         email: $('#email').val(),

//     }, {
//         merge: true
//     });
// });

$("#next").on('click',() => {
    window.location.href = "src/html/prek/prek.html"; 
})

add_emp.on('submit', (e) => {
    e.preventDefault();
    console.log("test");
    // x.style.display = 'none';
    // y.style.display = 'none';
    // z.style.display = 'block';
    db.collection('employee').add({
        fullname: $('#fullname').val(),
        age: $('#age').val(),
        address: $('#address').val(),
        email: $('#email').val(),
        added_at: Date()
    });
    $('#fullname').val('');
    $('#age').val('');
    $('#address').val('');
    $('#email').val('');

//test().then(window.location.replace("file:///C:/Users/sonam/OneDrive/Documents/Sonam-test%20samples/firebase-crud/src/html/prek/prek.html")) 
    window.location.replace("file:///C:/Users/sonam/OneDrive/Documents/Sonam-test%20samples/firebase-crud/src/html/prek/prek.html");
});
{
    db.collection('employee').onSnapshot(snapshot => {

    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            fetchAllemployees(change.doc);
            
        } else if (change.type == "removed") {
            var id = change.doc.id;
            $('#' + id).remove();


            // console.log(change.type);
        } else if (change.type == "modified") {
            var id = change.doc.id;
            $('#' + id).remove();
            fetchAllemployees(change.doc);

            // console.log(change.type);
        }
    });

    
});
}