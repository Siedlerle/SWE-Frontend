import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {MatCardContent} from "@angular/material/card";
import {UiUserService} from "../../services/ui-user.service";
import {Organisation} from "../../DataTransferObjects/Organisation";
import {URLs} from "../../assets/SystemVariables/URLs";
import {User} from "../../DataTransferObjects/User";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  menuItems = [
    { label: 'Start', route: '/homepage' },
    { label: 'Eventkatalog', route: '/event-catalog' },
    { label: 'Meine Events', route: '/my-events' },
    { label: 'Organisationskatalog', route: 'organisation-catalog'},
    { label: 'Verwaltung', route: '/management' }
  ];

  activeLink: string;
  organisationsForUser!:Organisation[];
  checkOrganisation!:Organisation[];
  user!: User;
  firstName: string | undefined = "";
  lastName: string | undefined = "";

  hasOrga = 0;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private uiUserService : UiUserService) { }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = event.url;
      }
    });

    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress!=null){
      this.uiUserService.getOrganisationForUser(emailAdress).subscribe(response =>{
        this.organisationsForUser = response;
      });
      this.uiUserService.getUserInformation(emailAdress).subscribe(response =>{
        this.user = response;
        this.firstName = this.user.firstname;
        this.lastName = this.user.lastname;
      });
    }

    const orgaId = sessionStorage.getItem('orgaId');
    const orgaRole = sessionStorage.getItem('orgaRole');
    if(orgaId != null && orgaId !== '' && orgaRole != null && orgaRole !== 'USER' && orgaRole !==''){
      sessionStorage.setItem('activeManagement', JSON.stringify(true));
    }else{
      sessionStorage.setItem('activeManagement', JSON.stringify(false));
    }

    if(orgaId === null || orgaId === ""){
      this.imageSource = "../../assets/images/OrgaBanner.png";
    }else{

      this.uiUserService.getOrganisation(orgaId).subscribe(data =>{
        if(data.image === null || data.image === "") {
          this.imageSource = "../../assets/images/OrgaBanner.png";

        }else{
          this.imageSource = this.backendURL+data.image;

        }
      })
    }


    if (this.firstName === "") {
      this.firstName = "Profil";
    }
  }

  isDropdownOpen = false;
  isDropdownOpenBanner = false;
  dropDownTop = 0;
  dropDownLeft = 0;

  backendURL: string = URLs.backend;
  imageSource?: string = "";

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdownBanner(event: MouseEvent) {
    this.isDropdownOpenBanner = !this.isDropdownOpenBanner;
    this.dropDownTop = event.clientY + 10;
    this.dropDownLeft = event.clientX -150;
  }

  onOrganisationClick(organisation:Organisation){
    sessionStorage.setItem('orgaId', JSON.stringify(organisation.id));
    if(organisation.image === null || organisation.image === ""){
      this.imageSource = "../../assets/images/OrgaBanner.png";
    }else{

      this.imageSource = this.backendURL+organisation.image;
    }

    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress != null && organisation.id != null){
      this.uiUserService.getRoleForUserInOrga(organisation.id, emailAdress).subscribe(response =>{
        sessionStorage.setItem('orgaRole',response.role);

        const orgaId = sessionStorage.getItem('orgaId');
        const orgaRole = sessionStorage.getItem('orgaRole');

        if(orgaId != null && orgaId !== '' && orgaRole != null && orgaRole !== 'USER' && orgaRole !==''){ //TODO Muss hier nicht noch neben User auch invited und requested hin? Gibts auch noch als Rollen in Orga
          sessionStorage.setItem('activeManagement', JSON.stringify(true));
          this.canManage();
        }else{
          sessionStorage.setItem('activeManagement', JSON.stringify(false));
          this.canManage();
        }

        location.reload();
      });
    }
    this.router.navigate(['']);
  }

  goBackToStart(){
    sessionStorage.setItem('orgaId', '');
    sessionStorage.setItem('orgaRole', '');
    sessionStorage.setItem('eventRole', '');

    this.imageSource = "../../assets/images/OrgaBanner.png";

    const orgaId = sessionStorage.getItem('orgaId');
    const orgaRole = sessionStorage.getItem('orgaRole');
    if(orgaId != null && orgaId !== '' && orgaRole != null && orgaRole !== 'USER' && orgaRole !==''){
      sessionStorage.setItem('activeManagement', JSON.stringify(true));
      this.canManage();
    }else{
      sessionStorage.setItem('activeManagement', JSON.stringify(false));
      this.canManage();
    }

    this.router.navigate(['']);
    location.reload();
  }

  showCard = false;
  openCard(){
    this.showCard = true;
  }
  closeCard(){
    this.showCard = false;
  }

  canManage(){
    return sessionStorage.getItem('activeManagement') === 'true';
  }

  logOut(){
    this.uiUserService.logout().subscribe();
    sessionStorage.setItem('authenticated', JSON.stringify(false));
    sessionStorage.setItem('accessToken', '');
    sessionStorage.setItem('refreshToken', '');
    sessionStorage.setItem('role', '');
    sessionStorage.setItem('orgaId', '');
    sessionStorage.setItem('emailAdress','');
    sessionStorage.setItem('orgaRole','');
    location.reload();
  }

  /*
  checkOrga(){
    const emailAdress = sessionStorage.getItem('emailAdress');
    if(emailAdress!=null) {
      this.uiUserService.getOrganisationForUser(emailAdress).subscribe(response => {
        this.checkOrganisation = response;
        this.checkOrganisation.forEach((organisation) => {
          this.compareOrgaIds(organisation.id);
        })
        if(this.hasOrga !=0){
          console.log(this.hasOrga)
        }else{
          this.goBackToStart();
        }
      });
    }
    this.hasOrga = 0;
  }

  compareOrgaIds(orgaId: number | undefined){
    const orgId = sessionStorage.getItem('orgaId');
    let orgIdInt;
    if(orgaId != null){
      // @ts-ignore
      orgIdInt = parseInt(sessionStorage.getItem('orgaId'));
    }
    if(orgaId === orgIdInt){
      this.hasOrga++
    }
  }*/
}
