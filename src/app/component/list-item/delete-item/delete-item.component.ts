import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../../services/endpoint-factory.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent implements OnInit {
  @Input() data;
  @Output() output = new EventEmitter();
  constructor(public activeModal: NgbActiveModal, private endpointFactory: EndpointFactory) { }

  ngOnInit() {
  }
  clickClose() {
    this.activeModal.close();
  }
  clickDelete() {
    let params = this.data.data.purchaseId;
    this.endpointFactory.deleteEndPoint(params, "purchases/" + params).subscribe(data => {
      if (data.status === "success") {
        this.output.emit("success");
        this.activeModal.close();
      };
    }
    );
  }
}