import {ChangeDetectionStrategy, Component} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatButtonModule, MatFabAnchor} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  imports: [MatToolbar, MatIcon, MatFabAnchor, MatButtonModule, RouterModule, CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarComponent {
  public menuItems = [
    {
      text: 'Users list',
      icon: 'person_pin',
      link: 'users'
    },
    {
      text: 'Add user',
      icon: 'add_circle',
      link: ''
    }
  ]
}
