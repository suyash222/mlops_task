const ip = '192.168.1.6'
const xhttp = new XMLHttpRequest();

function show_cont() {

    let cmd = 'docker ps -a --format=\'{{json .}}\''

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)

    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();
    xhttp.onload = () => {
        const output = xhttp.responseText;
        const rows = ['Command', 'CreatedAt', 'ID', 'Image', 'Names', 'Ports', 'Status']
        docker_images(output, rows);
    }
}

function show_img() {

    let cmd = 'docker images --format=\'{{json .}}\''

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)

    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();
    xhttp.onload = () => {
        const output = xhttp.responseText;
        const rows = ['CreatedAt', 'CreatedSince', 'ID', 'Repository', 'Size', 'Tag']
        docker_images(output, rows);
    }
}

function show_run_cont() {

    let cmd = 'docker ps --format=\'{{json .}}\''

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)

    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        const output = xhttp.responseText;
        const rows = ['Command', 'CreatedAt', 'ID', 'Image', 'Names', 'Ports', 'Status']
        docker_images(output, rows);
    }
}

function sub_cmd() {

    let cmd = document.getElementById('cmd').value;
    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)

    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        const output = xhttp.responseText;
        del_output()
        const div = document.getElementById('output');
        const pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(output));
        div.appendChild(pre);
    }
}

function del_cont() {

    let cont_name = document.getElementById('cont_name').value;
    let cmd = 'docker rm -f ' + cont_name;

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)
    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        let output = xhttp.responseText;
        output = `Container ${output} deleted`;
        del_output();
        const div = document.getElementById('output');
        const pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(output));
        div.appendChild(pre);
    }
}

function lanuch_container() {

    let img_name = document.getElementById('img_name').value;
    let container_name = document.getElementById('container_name').value;

    if (!img_name) {
        alert('Give Image Name');
        return;
    }

    let cmd = `docker run -itd ${img_name}`;

    if(container_name) {
        cmd = `docker run -itd --name ${container_name} ${img_name}`;
    }

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)
    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        let output = xhttp.responseText;
        del_output();
        const div = document.getElementById('output');
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(output));
        div.appendChild(p);
    }
}

function run_command() {
    let con_name = document.getElementById('con_name').value;
    let command = document.getElementById('command').value;

    if (!con_name) {
        alert('Give Container Name');
        return;
    }

    let cmd = `docker exec ${con_name} ${command}`;

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)
    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        let output = xhttp.responseText;
        del_output();
        const div = document.getElementById('output');
        const pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(output));
        div.appendChild(pre);
    }
}

function del_output() {

    const div = document.getElementById('output');

    while (div.lastElementChild)
    {
        div.removeChild(div.lastElementChild)
    }
}