import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ErrorService } from "./shared/services/error/error.service";
import { ModalService } from "./shared/services/modal/modal.service";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe("AppComponent", () => {
    let errorService: ErrorService;
    let modalService: ModalService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AppComponent],
        providers: [ErrorService, ModalService],
      }).compileComponents();

      errorService = TestBed.inject(ErrorService);
      modalService = TestBed.inject(ModalService);
    });

    it("should create the app", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it("should inject ErrorService", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app["errorService"]).toBe(errorService);
    });

    it("should inject ModalService", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app["modalService"]).toBe(modalService);
    });

    it("should have error property from ErrorService", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.error).toBe(errorService.error);
    });

    it("should have modal property from ModalService", () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.modal).toBe(modalService.modal);
    });
  });
});
