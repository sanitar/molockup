class MockupsController < ApplicationController
  def index
    @mockups = Mockup.all
  end

  def show
    @mockup = Mockup.find(params[:id])
  end

  def new
    @mockup = Mockup.new
  end

  def create
    @mockup = Mockup.new(params[:mockup])
    if @mockup.save
      redirect_to @mockup, :notice => "Successfully created mockup."
    else
      render :action => 'new'
    end
  end

  def edit
    @mockup = Mockup.find(params[:id])
  end

  def update
    @mockup = Mockup.find(params[:id])
    if @mockup.update_attributes(params[:mockup])
      redirect_to @mockup, :notice  => "Successfully updated mockup."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @mockup = Mockup.find(params[:id])
    @mockup.destroy
    redirect_to mockups_url, :notice => "Successfully destroyed mockup."
  end
end
