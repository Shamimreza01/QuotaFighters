import { makeUrl } from "./common.js";

let i=1;
document.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let Name=e.target.name.value;
    let Img=e.target.img.value;
    let Occupation=e.target.occupation.value;
    let Institution=e.target.institution.value;
    let Department=e.target.department.value;
    let DepartmentalInfo=e.target.departmentalInfo.value;
    let ParentsInfo=e.target.parentsInfo.value;
    let Address=e.target.address.value;
    let Date=e.target.date.value;
    let Profile_Link=e.target.profileUrl.value;
    let DetailsInfo=e.target.detailsInfo.value;
    let ProviderInfo=e.target.providerInfo.value;
    
    const data={
        "Name": Name,
        "ImgUrl": Img,
        "Occupation": Occupation,
        "Institution": Institution,
        "Department": Department,
        "DepartmentalInfo": DepartmentalInfo ,
        "ParentsInfo": ParentsInfo,
        "Address": Address,
        "Date": Date,
        "Profile_Link":Profile_Link,
        "DetailsInfo": DetailsInfo,
        "ProviderInfo": ProviderInfo
    }
    console.log(data);
    if(i===1){
        alert("recheck");
        i++;
    }else{
    const url=makeUrl('/FFListSubmit');
    const response=await fetch(url,{
        method: "POST",
        headers:{
             'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    const d=await response.json();
    if(d.acknowledged===true){
        alert('successfully submitted,please wait we try to verify your data , it takes some time');
        window.location.href='../public/index.html';
    }
}
})