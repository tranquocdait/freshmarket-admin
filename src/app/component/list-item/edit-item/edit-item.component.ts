import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointFactory } from '../../../services/endpoint-factory.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  purchaseList: any;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private endpointFactory: EndpointFactory) {
  }

  @Input() data;
  @Output() output = new EventEmitter();
  editForm: FormGroup;

  ngOnInit(): void {
    this.getPurchase();
    this.createForm();
  }

  getPurchase() {
    this.endpointFactory.getEndPoint('statusPurchases').subscribe(data => {
      if (data.status === 'success') {
        this.purchaseList = data.data;
      }
      ;
    }
    );
  }

  createForm() {
    if (this.data.type === 'edit') {
      this.modeEdit();
    }
  }

  modeEdit() {
    this.editForm = this.formBuilder.group({
      postName: [this.data.data.postName, Validators.required],
      purchaseId: [this.data.data.purchaseId, Validators.required],
      sellerName: [this.data.data.sellerName, Validators.required],
      buyerName: [this.data.data.buyerName, Validators.required],
      unitPrice: [this.data.data.unitPrice, Validators.required],
      purchaseNumber: [this.data.data.purchaseNumber, Validators.required],
      statusPurchase: [this.data.data.statusPurchase.id, Validators.required],
    });
  }

  clickClose() {
    this.activeModal.close();
  }

  onSubmit() {
    let params: any = {
      purchaseId: this.editForm.value['purchaseId'],
      purchaseNumber:Number.parseInt(this.editForm.value['purchaseNumber']),
      statusPurchaseId: Number.parseInt(this.editForm.value['statusPurchase'])
    };
    {
      this.endpointFactory.putEndPoint(params, 'purchases/' + this.data.data.purchaseId).subscribe(data => {
        if (data.status === 'success') {
          this.output.emit('success');
          this.activeModal.close();
        }
        ;
      }
      );
    }
  }
}
