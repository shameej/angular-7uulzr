import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css'],
})
export class SignatureComponent {
  @ViewChild('canvas') canvasRef!: ElementRef;
  private ctx: CanvasRenderingContext2D | null = null;
  private canvasWidth: number = 500;
  private canvasHeight: number = 300;

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    if (this.ctx) {
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
    }
  }

  private drawLine(x0: number, y0: number, x1: number, y1: number) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
      this.ctx.stroke();
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.ctx) {
      const { offsetX, offsetY } = event;
      this.ctx.beginPath();
      this.ctx.moveTo(offsetX, offsetY);
      this.ctx.lineTo(offsetX, offsetY);
      this.ctx.stroke();
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.ctx) {
      const { offsetX, offsetY } = event;
      const { nativeElement } = this.canvasRef;
      const { left, top } = nativeElement.getBoundingClientRect();
      const x = offsetX + left;
      const y = offsetY + top;
      const prevPos = this.getLastPosition();
      this.drawLine(prevPos.x, prevPos.y, x, y);
    }
  }

  private getLastPosition() {
    const { width, height } =
      this.canvasRef.nativeElement.getBoundingClientRect();
    if (this.ctx) {
      const data = this.ctx.getImageData(0, 0, width, height).data;
      for (let i = (data.length || 0) - 1; i >= 0; i -= 4) {
        const alpha = data[i];
        if (alpha && alpha > 0) {
          const x = Math.floor((i / 4) % width);
          const y = Math.floor(i / 4 / width);
          return { x, y };
        }
      }
    }
    return { x: 0, y: 0 };
  }

  clear() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
  }

  getSignatureDataUrl(): string {
    return this.canvasRef.nativeElement.toDataURL();
  }
}
