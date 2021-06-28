const ip = '192.168.1.6'
const xhttp = new XMLHttpRequest();

function show_all_deplo() {

    let cmd = 'kubectl get deployment -o=wide'

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)

    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();
    xhttp.onload = () => {
        const output = xhttp.responseText;
        const rows = ['Name', 'Ready', 'Up To Date', 'Avaaliable', 'Age',  'Conatainers', 'Image', 'Selector']
        console.log(output)
        get_output(output, rows);
    }
}

function show_pods() {

    let cmd = 'kubectl get pods -o=wide'

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)

    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        const output = xhttp.responseText;
        const rows = ['Name', 'Ready', 'Status', 'Restarts', 'Age', 'IP', 'Nodes', 'Nominated Node', 'Redainess Gates']
        console.log(output)
        get_output(output, rows);
    }
}

function sub_cmd() {

    let cmd = document.getElementById('cmd').value;
    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)

    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        const output = xhttp.responseText;
        del_output();
        const div = document.getElementById('output');
        const pre = document.createElement('pre');
        pre.appendChild(document.createTextNode(output));
        div.appendChild(pre);
    }
}

function del_deplo() {

    let dep_name = document.getElementById('del_deplo').value;
    let cmd = `kubectl delete deployment ${dep_name}`;

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

function create_deployment() {

    let image_name = document.getElementById('image_name').value;
    let deployment_name = document.getElementById('deployment_name').value

    if(!image_name || !deployment_name) {

        alert('Enter image and depdeployment name')
        return
    }

    let cmd = `kubectl create deployment ${deployment_name}  --image=${image_name}`;

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

function create_pod() {

    let pod_image_name = document.getElementById('pod_image_name').value;
    let pod_name = document.getElementById('pod_name').value

    if(!pod_image_name || !pod_name) {

        alert('Enter image and pod name')
        return
    }

    let cmd = `kubectl run ${pod_name}  --image=${pod_image_name}`;

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

function get_service() {

    let cmd = `kubectl get service -o=wide`;

    console.log(`http://${ip}/cgi-bin/eg.py?cmd=${cmd}`)
    xhttp.open('GET', `http://${ip}/cgi-bin/eg.py?cmd=${cmd}`, true);
    xhttp.send();

    xhttp.onload = () => {
        let output = xhttp.responseText;
        del_output();
        const rows = ['Name', 'Type', "IP", 'External IP', 'PORT(S)', 'Age', 'Selector']
        console.log(output)
        get_output(output, rows);
    }
}

function scale_deployment() {

    let scale_deployment_name = document.getElementById('scale_deployment_name').value;

    let scale_no = document.getElementById('sacle_no').value

    if(!scale_no || !scale_deployment_name) {

        alert('Enter image and pod name')
        return
    }

    let cmd = `kubectl scale deployment ${scale_deployment_name} --replicas ${scale_no}`;

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

function expose_deployment() {

    let expose_deployment_name = document.getElementById('expose_deployment_name').value;

    let port_no = document.getElementById('port_no').value

    let cmd = `kubectl expose deployment ${expose_deployment_name} --type=NodePort --port=${port_no}`;

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

function delete_service() {

    let service = document.getElementById('service').value;

    let service_name = document.getElementById('service_name').value

    let cmd = `kubectl delete ${service} ${service_name}`;

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

function delete_all() {

    let cmd = `kubectl delete all --all`;

    if(!confirm('Do you really want to delete everything')) {
        return
    }

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